<script setup>
import { ref, onMounted, computed } from 'vue'
import EventCard from '../components/EventCard.vue'
import mockEvents from '../data/mockEvents.json'

const events = ref([])

onMounted(() => {
  events.value = mockEvents
})

const recentEvents = computed(() => {
  return [...events.value]
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 6)
})
</script>

<template>
  <div class="home-container">
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">AI-Overwatch</h1>
        <p class="hero-subtitle">Intelligent Camera Event Detection System</p>
        <p class="hero-description">
          Monitor and analyze real-time events detected by our AI-powered camera system. 
          Track human activities, analyze patterns, and receive instant notifications for 
          important events. Our advanced machine learning algorithms detect and classify 
          actions with high precision, providing you with comprehensive surveillance insights.
        </p>
        <div class="hero-buttons">
          <router-link to="/live" class="btn btn-primary">
            Go Live
          </router-link>
          <router-link to="/" class="btn btn-secondary">
            View Dashboard
          </router-link>
        </div>
      </div>
    </div>

    <div class="recent-events-section">
      <h2 class="section-title">Recent Detections</h2>
      <div class="events-grid">
        <EventCard 
          v-for="(event, index) in recentEvents" 
          :key="index" 
          :event="event"
        />
      </div>
    </div>

    
  </div>
</template>

<style scoped>
.home-container {
  min-height: 100vh;
  background-color: #1a1a1a;
  color: #ffffff;
}

.hero-section {
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
  border-bottom: 2px solid #3a3a3a;
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.hero-title {
  font-size: 4rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  background: linear-gradient(135deg, #4a9eff 0%, #68b4ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.5rem;
  color: #b0b0b0;
  margin: 0 0 2rem 0;
  font-weight: 500;
}

.hero-description {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #d0d0d0;
  max-width: 800px;
  margin: 0 auto 3rem auto;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
}

.btn-icon {
  font-size: 1.2rem;
}

.btn-primary {
  background: linear-gradient(135deg, #4a9eff 0%, #3a8eff 100%);
  color: #ffffff;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #5aaaff 0%, #4a9eff 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(74, 158, 255, 0.4);
}

.btn-secondary {
  background-color: #2a2a2a;
  color: #ffffff;
  border: 2px solid #4a4a4a;
}

.btn-secondary:hover {
  background-color: #3a3a3a;
  border-color: #5a5a5a;
  transform: translateY(-2px);
}

.recent-events-section {
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: 2.5rem;
  margin: 0 0 2rem 0;
  text-align: center;
  color: #ffffff;
}

.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
}

.features-section {
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #1e1e1e;
  border-radius: 16px;
  margin-bottom: 4rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.feature-card {
  background-color: #2a2a2a;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.feature-card:hover {
  border-color: #4a9eff;
  transform: translateY(-4px);
  box-shadow: 0 6px 20px rgba(74, 158, 255, 0.2);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-title {
  font-size: 1.3rem;
  margin: 0 0 1rem 0;
  color: #ffffff;
}

.feature-description {
  font-size: 1rem;
  line-height: 1.6;
  color: #b0b0b0;
  margin: 0;
}
</style>
