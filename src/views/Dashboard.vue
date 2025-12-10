<script setup>
import { ref, onMounted } from 'vue'
import EventSidebar from '../components/EventSidebar.vue'
import StatsPanel from '../components/StatsPanel.vue'
import mockEvents from '../data/mockEvents.json'

const events = ref([])

onMounted(() => {
  events.value = mockEvents
})
</script>

<template>
  <div class="dashboard-container">
    <EventSidebar :events="events" />
    <StatsPanel :events="events" />
  </div>
</template>

<style scoped>
.dashboard-container {
  display: flex;
  width: 100%;
  height: 100vh;
  /* background-color: #1a1a1a; Removed */
  overflow: hidden;
}
</style>

