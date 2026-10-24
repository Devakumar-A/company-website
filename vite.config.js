import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    target: "es2020",
    cssCodeSplit: true,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (
              id.includes("react") ||
              id.includes("react-dom") ||
              id.includes("react-router-dom")
            ) {
              return "vendor-framework";
            }
            if (id.includes("framer-motion")) {
              return "vendor-motion";
            }
            if (id.includes("lucide-react")) {
              return "vendor-icons";
            }
            if (id.includes("@supabase")) {
              return "vendor-supabase";
            }
          }
          if (id.includes("src/sections/Services")) {
            return "section-services";
          }
          if (
            id.includes("src/sections/Solutions") ||
            id.includes("src/components/ThreeDBendCarousel")
          ) {
            return "section-solutions";
          }
          if (id.includes("src/sections/Technology")) {
            return "section-technology";
          }
        },
      },
    },
  },
});
