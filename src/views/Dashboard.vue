<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import EventSidebar from '../components/EventSidebar.vue'
import StatsPanel from '../components/StatsPanel.vue'

const events = ref([])
let updateInterval = null

const fetchEvents = async () => {
  try {
    const response = await fetch('/api/gestures')
    const data = await response.json()
    console.log('Fetched gestures:', data)
    events.value = data
  } catch (error) {
    console.error('Error fetching gestures:', error)
  }
}

onMounted(() => {
  fetchEvents()
  updateInterval = setInterval(fetchEvents, 2000) // Check every 2 seconds
})

onUnmounted(() => {
  if (updateInterval) {
    clearInterval(updateInterval)
  }
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
  height: 100%;
  /* background-color: #1a1a1a; Removed */
  overflow: hidden;
}
</style>

