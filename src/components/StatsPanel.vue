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

const processEventData = (eventName) => {
  const last7Days = getLast7Days()
  
  const dayCounts = last7Days.map(date => {
    const count = props.events.filter(event => {
      const eventDate = new Date(event.timestamp).toISOString().split('T')[0]
      return eventDate === date && event.name === eventName
    }).length
    
    return {
      date: date,
      count: count
    }
  })
  
  return dayCounts
}

const drankWaterData = computed(() => processEventData('drank water'))
const thumbsUpData = computed(() => processEventData('person gave a thumbs up'))
const enteredRoomData = computed(() => processEventData('person entered room'))
</script>

<template>
  <div class="stats-panel">
    <BlockGraph 
      title="Drank Water" 
      :data="drankWaterData" 
    />
    <BlockGraph 
      title="Thumbs Up" 
      :data="thumbsUpData" 
    />
    <BlockGraph 
      title="Entered Room" 
      :data="enteredRoomData" 
    />
  </div>
</template>

<style scoped>
.stats-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  /* background-color: #1a1a1a; Removed */
  overflow: hidden;
}
</style>

