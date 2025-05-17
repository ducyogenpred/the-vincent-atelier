import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import fg from "fast-glob";
import fs from "fs";
import path from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Find all HTML files (except node_modules and dist)
const htmlFiles = fg.sync(["**/*.html", "!node_modules/**", "!dist/**"]);

export default defineConfig({
  base: "./", // 👈 All asset paths are now relative
  plugins: [
    tailwindcss(),
    {
      name: "replace-absolute-links",
      apply: "build",
      enforce: "post",
      closeBundle() {
        const dir = "./dist";
        const files = fs.readdirSync(dir).filter((f) => f.endsWith(".html"));
        files.forEach((file) => {
          const filePath = path.join(dir, file);
          let html = fs.readFileSync(filePath, "utf-8");
          // Replace href="/.../file.html" with href="./.../file.html"
          html = html.replace(/href="\/([^":]+?)"/g, 'href="./$1"');
          fs.writeFileSync(filePath, html);
        });
      },
    },
  ],
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
