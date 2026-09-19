import { createApp } from 'vue'

import "@paraxe/design/tokens.css"
import "./styles/paraxe-preset.css"
import "./styles/paraxe-theme.css"
import "@paraxe/design/components.css"
import "./style.css";
import { applyRuntimeStyles } from "./config-runtime";

applyRuntimeStyles();
import './style.css'
import App from './App.vue'
import router from "./router"

createApp(App)
  .use(router)
  .mount("#app")