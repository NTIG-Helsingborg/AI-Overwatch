<script setup>
import { computed } from 'vue'

const props = defineProps({
  events: {
    type: Array,
    required: true
  }
})

const sortedEvents = computed(() => {
  return [...props.events].sort((a, b) => {
    return new Date(b.timestamp) - new Date(a.timestamp)
  })
})

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp)
  return date.toLocaleString()
}
</script>

<template>
  <aside class="sidebar">
    <h2 class="sidebar-title">Events</h2>
    <div class="events-list">
      <div 
        v-for="(event, index) in sortedEvents" 
        :key="index" 
        class="event-item"
      >
        <div class="event-name">{{ event.name }}</div>
        <div class="event-time">{{ formatTimestamp(event.timestamp) }}</div>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 300px;
  height: 100vh;
  background-color: #1e1e1e;
  color: #ffffff;
  padding: 20px;
  overflow-y: auto;
  border-right: 1px solid #333;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.sidebar::-webkit-scrollbar {
  display: none;
}

.sidebar-title {
  margin: 0 0 20px 0;
  font-size: 24px;
  font-weight: 600;
}

.events-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.event-item {
  padding: 12px;
  background-color: #2a2a2a;
  border-radius: 8px;
  border-left: 3px solid #4a9eff;
}

.event-name {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 6px;
  color: #ffffff;
}

.event-time {
  font-size: 12px;
  color: #888;
}
</style>

