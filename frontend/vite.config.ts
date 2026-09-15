import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import Components from "unplugin-vue-components/vite"
import { ParaxeResolver } from "@paraxe/vue/resolver"
import path from "path"

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [ParaxeResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
  },
})