<script setup>
import ShootingStars from './components/ShootingStars.vue'
</script>

<template>
  <div id="app">
    <ShootingStars />
    <nav class="main-nav">
      <router-link to="/Home">Home</router-link>
      <router-link to="/">Dashboard</router-link>
      <router-link to="/live">Live</router-link>
    </nav>
    <div class="router-view-container">
      <router-view />
    </div>
  </div>
</template>

<style>
#app {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.main-nav {
  display: flex;
  gap: 1rem;
  padding: 1rem 2rem;
  background-color: #2a2a2a;
  border-bottom: 2px solid #3a3a3a;
  flex-shrink: 0;
}

.main-nav a {
  color: #ffffff;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.main-nav a:hover {
  background-color: #3a3a3a;
}

.main-nav a.router-link-active {
  background-color: #4a4a4a;
}

.router-view-container {
  flex: 1;
  overflow: auto;
}
</style>
