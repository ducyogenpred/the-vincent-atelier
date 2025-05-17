import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import fg from "fast-glob";

const __dirname = dirname(fileURLToPath(import.meta.url));

const htmlFiles = fg.sync(["**/*.html", "!node_modules/**", "!dist/**"]);

export default defineConfig({
  base: '/the-vincent-atelier/',
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: Object.fromEntries(
        htmlFiles.map((file) => {
          const fileName = file.split("/").pop();
          return [fileName.replace(".html", ""), resolve(__dirname, file)];
        }),
      ),
    },
  },
});
