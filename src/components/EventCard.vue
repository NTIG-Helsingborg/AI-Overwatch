<script setup>
import { computed } from 'vue'

const props = defineProps({
  event: {
    type: Object,
    required: true
  },
  showBadge: {
    type: Boolean,
    default: true
  }
})

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp)
  const now = new Date()
  const diffInMinutes = Math.floor((now - date) / 60000)
  
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`
  } else if (diffInMinutes < 1440) {
    const hours = Math.floor(diffInMinutes / 60)
    return `${hours} hour${hours > 1 ? 's' : ''} ago`
  } else {
    const days = Math.floor(diffInMinutes / 1440)
    return `${days} day${days > 1 ? 's' : ''} ago`
  }
}



const formattedTime = computed(() => formatTimestamp(props.event.timestamp))
const eventIcon = computed(() => getEventIcon(props.event.name))
</script>

<template>
  <div class="event-card">
    <div class="event-details">
      <h3 class="event-name">{{ event.name }}</h3>
      <p class="event-time">{{ formattedTime }}</p>
    </div>
    <div v-if="showBadge" class="event-badge">AI Detected</div>
  </div>
</template>

<style scoped>
.event-card {
  background-color: #2a2a2a;
  border-radius: 20px;
  padding: 1.5rem;
  border-left: 4px solid #4a9eff;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
  position: relative;
}

.event-card:hover {
  background-color: #333333;
  transform: translateY(-4px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

.event-icon {
  font-size: 2.5rem;
  flex-shrink: 0;
}

.event-details {
  flex: 1;
}

.event-name {
  font-size: 1.1rem;
  margin: 0 0 0.5rem 0;
  color: #ffffff;
  text-transform: capitalize;
}

.event-time {
  font-size: 0.9rem;
  color: #888888;
  margin: 0;
}

.event-badge {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background-color: #4a9eff;
  color: #ffffff;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
}
</style>
