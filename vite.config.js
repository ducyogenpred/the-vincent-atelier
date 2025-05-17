// vite.config.js
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import fg from "fast-glob";
import fs from "fs";
import path from "path";

export default defineConfig({
  base: "/the-vincent-atelier/",
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
          html = html.replace(/href="\/(.*?)"/g, 'href="./$1"');
          fs.writeFileSync(filePath, html);
        });
      },
    },
  ],
  build: {
    rollupOptions: {
      input: Object.fromEntries(
        fg.sync(["**/*.html", "!node_modules/**", "!dist/**"]).map((file) => {
          const fileName = file.split("/").pop();
          return [fileName.replace(".html", ""), file];
        }),
      ),
    },
  },
});
