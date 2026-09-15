import { createApp } from 'vue'
import "@paraxe/design/style.css"
import "@paraxe/design/presets/corporate.css";
import "./styles/theme.css";
import './style.css'
import App from './App.vue'
import router from "./router"

createApp(App)
  .use(router)
  .mount("#app")