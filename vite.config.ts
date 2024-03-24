import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => {
            if (tag === "model-viewer") return true;
            if (tag.slice(0, 7) === "fluent-") return true;
          },
        },
      },
    }),
  ],
  base: "/3d-model/",
  assetsInclude: ["**/*.glb"],
});
