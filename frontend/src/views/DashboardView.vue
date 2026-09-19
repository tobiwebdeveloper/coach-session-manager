<script setup lang="ts">
import { onMounted, ref } from "vue"
import { getSessions } from "../services/sessions"
import type { Session } from "../types/session"
import { Icon } from "@iconify/vue"

const sessions = ref<Session[]>([])
const loading = ref(true)
const error = ref("")

const stats = [
  {
    label: "Upcoming sessions",
    value: () => sessions.value.length,
    detail: "Scheduled sessions",
    icon: "solar:layers-linear",
    tone: "brand",
  },
  {
    label: "Today's sessions",
    value: () => {
      const today = new Date().toISOString().split("T")[0]

      return sessions.value.filter(
        session => session.date === today
      ).length
    },
    detail: "Sessions today",
    icon: "solar:calendar-linear",
    tone: "info",
  },
  {
    label: "Total bookings",
    value: () => 0,
    detail: "Player bookings",
    icon: "solar:shield-check-linear",
    tone: "success",
  },
  {
    label: "Attendance",
    value: () => "—",
    detail: "Attendance rate",
    icon: "solar:danger-triangle-linear",
    tone: "warning",
  },
]

onMounted(async () => {
  try {
    sessions.value = await getSessions()
  } catch {
    error.value = "Unable to load sessions."
  } finally {
    loading.value = false
  }
})
</script>

<template>
<div class="dashboard-header">
  <SectionHeader>
    <Eyebrow>Overview</Eyebrow>
    <Heading level="h1">Dashboard</Heading>
    <Text>
      Here's an overview of your upcoming sessions and academy activity.
    </Text>
  </SectionHeader>

  <Button size="small" class="create-session-button">
    <span class="button-content">
      <Icon icon="solar:add-circle-linear" width="17" height="17" />
      Create session
    </span>
  </Button>
</div>

  <section class="metric-grid" aria-label="Session metrics">
    <Card
      v-for="stat in stats"
      :key="stat.label"
      class="metric-card"
      variant="elevated"
    >
      <div class="metric-card__top">
        <Text as="span" tone="muted">
          {{ stat.label }}
        </Text>

        <span
          class="metric-icon"
          :class="`is-${stat.tone}`"
        >
          <Icon
            :icon="stat.icon"
            width="18"
            height="18"
          />
        </span>
      </div>

      <Heading level="h2">
        {{ stat.value() }}
      </Heading>

      <Text as="span" tone="secondary">
        {{ stat.detail }}
      </Text>
    </Card>
  </section>
</template>
<style scoped>
.dashboard-header {
  position: relative;
}

.create-session-button {
  position: absolute;
  top: 0;
  right: 0;
}

.button-content {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
}</style>