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
    const timeA = new Date(a.timestamp || a.detected_at || a.created_at)
    const timeB = new Date(b.timestamp || b.detected_at || b.created_at)
    return timeB - timeA
  })
})

const formatTimestamp = (timestamp) => {
  if (!timestamp) return 'Unknown time'
  
  const date = new Date(timestamp)
  if (isNaN(date.getTime())) return 'Invalid time'
  
  const now = new Date()
  const diffInMinutes = Math.floor((now - date) / 60000)
  
  if (diffInMinutes < 1) {
    return 'Just now'
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`
  } else if (diffInMinutes < 1440) {
    const hours = Math.floor(diffInMinutes / 60)
    return `${hours} hour${hours > 1 ? 's' : ''} ago`
  } else {
    const days = Math.floor(diffInMinutes / 1440)
    return `${days} day${days > 1 ? 's' : ''} ago`
  }
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
        <div class="event-name">{{ event.gesture_type || event.name }}</div>
        <div class="event-time">{{ formatTimestamp(event.timestamp || event.detected_at || event.created_at) }}</div>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 300px;
  height: 100%;
  background-color: #1e1e1e;
  color: #ffffff;
  padding: 20px;
  overflow-y: auto;
  border-right: 1px solid #333;
  scrollbar-width: none;
  -ms-overflow-style: none;
  flex-shrink: 0;
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

