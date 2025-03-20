import { defineConfig } from "vite";
import glsl from "vite-plugin-glsl";

export default defineConfig({
  root: "src/",
  base: "./",
  server: {
    host: true,
  },
  plugins: [glsl()],
});
