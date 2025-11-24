import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  optimizeDeps: { force: true },
  build: { outDir: "dist" },
  resolve: { alias: { "@": path.resolve(__dirname, "./src"), src: "/src" } },
  server: { allowedHosts: ["*"] }
});
