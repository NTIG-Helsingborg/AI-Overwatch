<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import EventSidebar from '../components/EventSidebar.vue'

const events = ref([])
const isLive = ref(true)
let updateInterval = null

// Simulera live-uppdateringar
const fetchLiveEvents = () => {
  // Här kan du senare koppla till en riktig websocket eller API
  console.log('Hämtar live-data...')
  
  // Exempel: lägg till ett nytt event varje uppdatering
  const newEvent = {
    id: Date.now(),
    type: ['info', 'warning', 'error'][Math.floor(Math.random() * 3)],
    timestamp: new Date().toISOString(),
    message: `Live event ${new Date().toLocaleTimeString()}`,
    source: 'Live System'
  }
  
  events.value = [newEvent, ...events.value].slice(0, 50) // Behåll max 50 events
}

onMounted(() => {
  // Starta live-uppdateringar
  fetchLiveEvents()
  updateInterval = setInterval(fetchLiveEvents, 5000) // Uppdatera var 5:e sekund
})

onUnmounted(() => {
  // Stoppa live-uppdateringar när komponenten avmonteras
  if (updateInterval) {
    clearInterval(updateInterval)
  }
})

const toggleLive = () => {
  isLive.value = !isLive.value
  if (isLive.value) {
    updateInterval = setInterval(fetchLiveEvents, 5000)
  } else {
    clearInterval(updateInterval)
  }
}
</script>

<template>
  <div class="live-container">
    <div class="live-header">
      <h1>Live Monitoring</h1>
      <div class="live-controls">
        <span :class="['status-indicator', { active: isLive }]"></span>
        <button @click="toggleLive" class="toggle-btn">
          {{ isLive ? 'Pause' : 'Resume' }}
        </button>
      </div>
    </div>
    <div class="dashboard-content">
      <EventSidebar :events="events" />
      <div class="live-feed-container">
        <div class="feed-header">
          <h2>Live Video Feed</h2>
        </div>
        <div class="live-feed-placeholder">
<img src="http://192.168.50.63:5000/video" style="max-width: 60%; height: auto; border: 2px solid #4a4a4a; border-radius: 8px;">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.live-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #1a1a1a;
  overflow: hidden;
}

.live-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #2a2a2a;
  border-bottom: 2px solid #3a3a3a;
}

.live-header h1 {
  color: #ffffff;
  font-size: 1.5rem;
  margin: 0;
}

.live-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.status-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #666;
  transition: all 0.3s ease;
}

.status-indicator.active {
  background-color: #00ff00;
  box-shadow: 0 0 10px #00ff00;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.toggle-btn {
  padding: 0.5rem 1rem;
  background-color: #4a4a4a;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s ease;
}

.toggle-btn:hover {
  background-color: #5a5a5a;
}

.dashboard-content {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.live-feed-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  padding-top: 40px;
  height: 93%;
  width: 90%;
  background-color: rgba(26, 26, 26, 0.5);
}

.feed-header {
  width: 100%;
  text-align: center;
  margin-bottom: 1rem;
}

.feed-header h2 {
  color: #ffffff;
  font-size: 1.5rem;
  margin: 0;
}

.live-feed-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60%;
  aspect-ratio: 16/9;
  background-color: #2a2a2a;
  border-radius: 12px;
  border: 2px solid #4a4a4a;
  color: #888;
  text-align: center;
  box-sizing: border-box;
}

.feed-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.live-feed-placeholder h2 {
  color: #ffffff;
  font-size: 1.5rem;
  margin: 0 0 0.5rem 0;
}

.live-feed-placeholder p {
  color: #888;
  font-size: 1rem;
  margin: 0;
}
</style>
