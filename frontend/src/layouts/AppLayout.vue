<script setup lang="ts">
import { ref, computed } from "vue"
import { Icon } from "@iconify/vue"
import { useRoute, useRouter } from "vue-router"

const router = useRouter()
const route = useRoute()
const navItems = [
  { label: "Dashboard", icon: "mdi:view-dashboard", path: "/" },
  { label: "Sessions", icon: "mdi:calendar", path: "/sessions" },
  { label: "Settings", icon: "mdi:cog", path: "/settings" },
]
const currentPage = computed(() => {
  return navItems.find(item => item.path === route.path)?.label ?? "Dashboard"
})
const search = ref("")
</script>

<template>
  <div class="csm-app">
    <aside class="csm-sidebar">
      <div class="brand-lockup">
        <div class="brand-symbol">
          CS
        </div>

        <div class="brand-copy">
          <Text
            as="span"
            tone="muted"
            class="brand-kicker"
          >
            Football academy
          </Text>

          <Heading level="h5">
            Coach Session Manager
          </Heading>
        </div>
      </div>

      <nav
        class="csm-sidebar-nav"
        aria-label="Main navigation"
      >
        <Text
          as="span"
          tone="muted"
          class="nav-label"
        >
          Workspace
        </Text>

        <button
  v-for="item in navItems"
  :key="item.label"
  type="button"
  class="sidebar-nav-item"
  :class="{ 'is-active': route.path === item.path }"
  @click="router.push(item.path)"
>
          <Icon
            :icon="item.icon"
            width="19"
            height="19"
          />

          <span class="label">
            {{ item.label }}
          </span>
        </button>
      </nav>

      <div class="sidebar-spacer" />
    </aside>

    <main class="csm-main">
     <header class="csm-topbar">
  <nav class="breadcrumb" aria-label="Breadcrumb">
    <Text tone="muted">
      Coach Session Manager
    </Text>

    <Icon
      icon="mdi:chevron-right"
      width="18"
      height="18"
    />

    <Text>
      {{ currentPage }}
    </Text>
  </nav>

  <div class="topbar-actions">
    <div class="search-control">
      <Icon
        icon="mdi:magnify"
        width="19"
        height="19"
      />

      <Input
        v-model="search"
        placeholder="Search..."
      />
    </div>
  </div>
</header>

      <div class="csm-content">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<style scoped>
.csm-app {
  display: grid;
  grid-template-columns: 248px minmax(0, 1fr);
  min-height: 100vh;
  background:
    radial-gradient(
      circle at 76% -12%,
      color-mix(in oklch, var(--brand-primary) 11%, transparent),
      transparent 30rem
    ),
    var(--background-primary);
}

.csm-sidebar {
  position: sticky;
  top: 0;

  display: flex;
  flex-direction: column;

  min-height: 100vh;
  padding: var(--space-6) var(--space-4);

  border-right: 1px solid var(--border-subtle);
  background: var(--nav-background);
}

.brand-lockup {
  display: flex;
  align-items: center;
  gap: var(--space-3);

  padding: 0 var(--space-2) var(--space-8);
}

.brand-symbol {
  display: grid;
  place-items: center;

  width: 2.5rem;
  height: 2.5rem;

  flex: 0 0 auto;

  border-radius: var(--radius-lg);
  background: var(--brand-primary);
  color: var(--text-on-brand);

  font-family: var(--font-family-display);
  font-weight: var(--font-weight-bold);
}

.brand-copy {
  min-width: 0;
}
.breadcrumb {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  min-width: 0;
  font-size: var(--font-size-sm);
}

.breadcrumb svg {
  flex: 0 0 auto;
  color: var(--text-muted);
}

.brand-kicker,
.nav-label {
  font-size: var(--font-size-xs);
  letter-spacing: var(--letter-spacing-wider);
  text-transform: uppercase;
}

.csm-sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.nav-label {
  padding: 0 var(--space-3) var(--space-2);
}

.sidebar-nav-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);

  width: 100%;
  padding: var(--space-3);

  border: 1px solid transparent;
  border-radius: var(--radius-md);

  background: transparent;
  color: var(--nav-link);

  text-align: left;

  transition:
    background var(--motion-duration-fast) var(--motion-ease-out),
    color var(--motion-duration-fast) var(--motion-ease-out),
    border-color var(--motion-duration-fast) var(--motion-ease-out);
}

.sidebar-nav-item:hover {
  background: var(--surface-hover);
  color: var(--nav-link-hover);
}

.sidebar-nav-item.is-active {
  background: color-mix(
    in oklch,
    var(--brand-primary) 13%,
    transparent
  );

  border-color: color-mix(
    in oklch,
    var(--brand-primary) 24%,
    transparent
  );

  color: var(--nav-link-active);
}

.sidebar-nav-item.is-active svg {
  color: var(--brand-primary);
}

.sidebar-nav-item span {
  color: inherit;
}

.sidebar-spacer {
  flex: 1;
}

.csm-main {
  min-width: 0;
}

.csm-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-6);

  min-height: 5rem;
  padding: 0 var(--space-8);

  border-bottom: 1px solid var(--border-subtle);

  background: color-mix(
    in oklch,
    var(--background-primary) 88%,
    transparent
  );
}

.topbar-actions {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.search-control {
  display: flex;
  align-items: center;
  gap: var(--space-2);

  min-width: min(19rem, 30vw);
  padding: 0 var(--space-3);

  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);

  background: var(--surface-base);
  color: var(--text-muted);
}

.search-control .input {
  min-width: 0;
  border: 0;
  background: transparent;
}

.csm-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);

  width: 100%;
  max-width: 1440px;

  margin: 0 auto;
  padding: var(--space-10) var(--space-8) var(--space-16);
}

@media (max-width: 1000px) {
  .csm-app {
    grid-template-columns: 5rem minmax(0, 1fr);
  }

  .csm-sidebar {
    padding-inline: var(--space-2);
  }

  .brand-lockup {
    justify-content: center;
    padding-inline: 0;
  }

  .brand-copy,
  .csm-sidebar-nav .nav-label,
  .sidebar-nav-item span {
    display: none;
  }

  .sidebar-nav-item {
    justify-content: center;
  }
}

@media (max-width: 720px) {
  .csm-topbar {
    align-items: stretch;
    flex-direction: column;
    gap: var(--space-3);
    padding: var(--space-4);
  }

  .topbar-actions {
    width: 100%;
  }

  .search-control {
    flex: 1;
    min-width: 0;
  }

  .csm-content {
    padding: var(--space-6) var(--space-4);
  }
}
</style>