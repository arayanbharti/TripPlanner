import path from "path";
import { fileURLToPath } from "url"; // Import to create __dirname
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Define __dirname in an ES module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});