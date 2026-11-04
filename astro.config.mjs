import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  site: "https://ghostdevhv.me",
  output: "static",
  outDir: "./build",
  vite: { plugins: [tailwindcss()] },
  devToolbar: { enabled: false },
});
