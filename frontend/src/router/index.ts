import {
  createRouter,
  createWebHistory
} from "vue-router"

import DashboardView from "../views/DashboardView.vue"
import SessionsView from "../views/SessionsView.vue"
import SessionView from "../views/SessionView.vue"

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: "/",
      redirect: "/dashboard"
    },

    {
      path: "/dashboard",
      name: "dashboard",
      component: DashboardView
    },

    {
      path: "/sessions",
      name: "sessions",
      component: SessionsView
    },

    {
      path: "/sessions/:id",
      name: "session",
      component: SessionView
    }
  ]
})

export default router