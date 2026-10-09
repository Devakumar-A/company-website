import fs from "fs";
import path from "path";

function walk(dir) {
  let res = [];
  fs.readdirSync(dir).forEach((f) => {
    let p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) res.push(...walk(p));
    else if (p.endsWith(".css")) res.push(p);
  });
  return res;
}

const files = walk("src/styles");
files.forEach((f) => {
  const content = fs.readFileSync(f, "utf8");
  const lines = content.split("\n");
  lines.forEach((l, idx) => {
    // Check for min-width > 300px not in media query
    const mwMatch = l.match(/min-width:\s*(\d+)px/);
    if (mwMatch && parseInt(mwMatch[1]) > 300) {
      console.log(`[LARGE MIN-WIDTH] ${f}:${idx + 1} -> ${l.trim()}`);
    }
    // Check for fixed width > 320px
    const wMatch = l.match(/(?<!max-)width:\s*(\d+)px/);
    if (
      wMatch &&
      parseInt(wMatch[1]) > 320 &&
      !l.includes("border") &&
      !l.includes("stroke")
    ) {
      console.log(`[FIXED LARGE WIDTH] ${f}:${idx + 1} -> ${l.trim()}`);
    }
    // Check for 100vw
    if (l.includes("100vw")) {
      console.log(`[100VW] ${f}:${idx + 1} -> ${l.trim()}`);
    }
  });
});
