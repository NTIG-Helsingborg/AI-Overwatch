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
    days.push(date.toISOString().split('T')[0])
  }
  return days
}

const processEventData = (gestureType) => {
  const last7Days = getLast7Days()
  
  const dayCounts = last7Days.map(date => {
    const count = props.events.filter(event => {
      const eventDate = new Date(event.timestamp || event.detected_at || event.created_at).toISOString().split('T')[0]
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
const thumbsUpData = computed(() => processEventData('thumbs_up'))
const thumbsDownData = computed(() => processEventData('thumbs_down'))
const victoryData = computed(() => processEventData('victory'))
const closedPalmData = computed(() => processEventData('closed_palm'))
const openPalmData = computed(() => processEventData('open_palm'))
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

