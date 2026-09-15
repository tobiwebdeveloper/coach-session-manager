<script setup lang="ts">
import {
  Sidebar,
  SidebarGroup,
  SidebarItem
} from "@paraxe/vue"

import {
  LayoutDashboard,
  CalendarDays
} from "lucide-vue-next"
</script>

<template>
  <div class="app-layout">
    <Sidebar class="sidebar">
      <div class="sidebar-header">
        <div class="logo">Coach Manager</div>
      </div>

      <SidebarGroup>
        <RouterLink to="/dashboard" class="nav-link">
          <SidebarItem>
            <LayoutDashboard :size="18" />
            <span>Dashboard</span>
          </SidebarItem>
        </RouterLink>

        <RouterLink to="/sessions" class="nav-link">
          <SidebarItem>
            <CalendarDays :size="18" />
            <span>Sessions</span>
          </SidebarItem>
        </RouterLink>
      </SidebarGroup>
    </Sidebar>

    <main class="main-content">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  flex-shrink: 0;
}

.main-content {
  flex: 1;
  min-width: 0;
  padding: 2rem;
}

.sidebar-header {
  padding: 1.5rem;
}

.logo {
  font-weight: 700;
  font-size: 1.1rem;
}

.nav-link {
  display: block;
  text-decoration: none;
  color: inherit;
}
</style>