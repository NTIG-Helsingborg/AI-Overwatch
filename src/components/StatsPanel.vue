<script setup>
import { computed } from 'vue'
import BlockGraph from './BlockGraph.vue'

const props = defineProps({
  events: {
    type: Array,
    required: true
  }
})

const getLast7Days = () => {
  const days = []
  for (let i = 6; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    date.setHours(0, 0, 0, 0)
    // Format as YYYY-MM-DD in local timezone
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    days.push(`${year}-${month}-${day}`)
  }
  return days
}

const processEventData = (gestureType) => {
  const last7Days = getLast7Days()
  
  const dayCounts = last7Days.map(date => {
    const count = props.events.filter(event => {
      const timestamp = event.timestamp || event.detected_at || event.created_at
      // Extract just the date part (YYYY-MM-DD) from the timestamp
      const eventDate = timestamp.split(' ')[0].split('T')[0]
      return eventDate === date && (event.gesture_type === gestureType || event.name === gestureType)
    }).length
    
    return {
      date: date,
      count: count
    }
  })
  
  return dayCounts
}

// Update these to match your actual gesture types from the database
const thumbsUpData = computed(() => processEventData('Thumb_Up'))
const thumbsDownData = computed(() => processEventData('Thumb_Down'))
const victoryData = computed(() => processEventData('Victory'))
const closedPalmData = computed(() => processEventData('Closed_ist'))
const openPalmData = computed(() => processEventData('Open_Palm'))
</script>

<template>
  <div class="stats-panel">
    <BlockGraph 
      title="Thumbs Up" 
      :data="thumbsUpData" 
    />
    <BlockGraph 
      title="Thumbs Down" 
      :data="thumbsDownData" 
    />
    <BlockGraph 
      title="Victory" 
      :data="victoryData" 
    />
    <BlockGraph 
      title="Closed Palm" 
      :data="closedPalmData" 
    />
    <BlockGraph 
      title="Open Palm" 
      :data="openPalmData" 
    />
  </div>
</template>

<style scoped>
.stats-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  /* background-color: #1a1a1a; Removed */
  overflow: hidden;
}
</style>

