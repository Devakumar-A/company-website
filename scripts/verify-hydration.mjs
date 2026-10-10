import { spawn } from 'child_process';
import http from 'http';

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9222;

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getWsUrl() {
  for (let i = 0; i < 20; i++) {
    try {
      const res = await new Promise((resolve, reject) => {
        http.get(`http://127.0.0.1:${PORT}/json/version`, (res) => {
          let data = '';
          res.on('data', (chunk) => (data += chunk));
          res.on('end', () => resolve(JSON.parse(data)));
        }).on('error', reject);
      });
      if (res.webSocketDebuggerUrl) return res.webSocketDebuggerUrl;
    } catch {}
    await sleep(200);
  }
  throw new Error('Chrome remote debugging not ready');
}

async function run() {
  console.log('Launching headless Chrome...');
  const chromeProc = spawn(CHROME_PATH, [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    `--remote-debugging-port=${PORT}`,
  ]);

  try {
    const wsUrl = await getWsUrl();
    const ws = new WebSocket(wsUrl);

    await new Promise((resolve) => ws.addEventListener('open', resolve, { once: true }));

    let id = 1;
    const send = (method, params = {}) => {
      const msgId = id++;
      return new Promise((resolve) => {
        const handler = (event) => {
          const msg = JSON.parse(event.data);
          if (msg.id === msgId) {
            ws.removeEventListener('message', handler);
            resolve(msg.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id: msgId, method, params }));
      });
    };

    // Create target
    const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
    const targetWsUrl = `ws://127.0.0.1:${PORT}/devtools/page/${targetId}`;
    const pageWs = new WebSocket(targetWsUrl);
    await new Promise((resolve) => pageWs.addEventListener('open', resolve, { once: true }));

    let pageMsgId = 1;
    const pageSend = (method, params = {}) => {
      const msgId = pageMsgId++;
      return new Promise((resolve) => {
        const handler = (event) => {
          const msg = JSON.parse(event.data);
          if (msg.id === msgId) {
            pageWs.removeEventListener('message', handler);
            resolve(msg.result);
          }
        };
        pageWs.addEventListener('message', handler);
        pageWs.send(JSON.stringify({ id: msgId, method, params }));
      });
    };

    await pageSend('Page.enable');
    await pageSend('Runtime.enable');

    const consoleLogs = [];
    pageWs.addEventListener('message', (event) => {
      const msg = JSON.parse(event.data);
      if (msg.method === 'Runtime.consoleAPICalled') {
        const text = msg.params.args.map((a) => a.value || a.description || '').join(' ');
        consoleLogs.push({ type: msg.params.type, text });
      } else if (msg.method === 'Runtime.exceptionThrown') {
        consoleLogs.push({ type: 'exception', text: msg.params.exceptionDetails?.text || 'Exception' });
      }
    });

    const routesToTest = [
      '/',
      '/about',
      '/services',
      '/contact',
      '/services/web-digital/ecommerce'
    ];

    for (const route of routesToTest) {
      consoleLogs.length = 0;
      console.log(`\nTesting route: ${route}`);
      await pageSend('Page.navigate', { url: `http://localhost:4173${route}` });
      await sleep(1500);

      const errorsAndWarnings = consoleLogs.filter(
        (l) => l.type === 'error' || l.type === 'warning' || l.text.toLowerCase().includes('hydrat')
      );

      console.log(`  Console entries recorded: ${consoleLogs.length}`);
      if (errorsAndWarnings.length === 0) {
        console.log('  -> Clean! No errors, warnings, or hydration mismatches.');
      } else {
        console.log('  -> Warnings/Errors encountered:');
        errorsAndWarnings.forEach((l) => console.log(`     [${l.type}] ${l.text}`));
      }
    }

    pageWs.close();
    ws.close();
  } finally {
    chromeProc.kill();
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
