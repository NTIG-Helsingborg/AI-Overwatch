<script setup>
import { ref, onMounted } from 'vue'

const stars = ref([])

onMounted(() => {
  // Create 5 random stars
  stars.value = Array.from({ length: 5 }, (_, i) => {
    // Determine if we spawn from the top edge or the right edge
    const fromRight = Math.random() > 0.5;
    
    return {
      id: i,
      // If from right: start beyond right edge (100% to 110%). If from top: anywhere horizontally (-10% to 110%)
      left: fromRight ? `${100 + Math.random() * 10}%` : `${Math.random() * 100}%`,
      // If from top: start above top edge (-10% to 0%). If from right: anywhere vertically (-10% to 100%)
      top: fromRight ? `${Math.random() * 100}%` : `-${Math.random() * 10}%`,
      animationDuration: Math.random() * 3 + 2 + 's',
      animationDelay: Math.random() * 5 + 's'
    }
  })
})
</script>

<template>
  <div class="shooting-stars-container">
    <div 
      v-for="star in stars" 
      :key="star.id" 
      class="star"
      :style="{
        left: star.left,
        top: star.top,
        animationDuration: star.animationDuration,
        animationDelay: star.animationDelay
      }"
    ></div>
  </div>
</template>

<style scoped>
.shooting-stars-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1; /* True background behind content */
  overflow: hidden;
}

.star {
  position: absolute;
  width: 4px;
  height: 4px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.1),
    0 0 0 8px rgba(255, 255, 255, 0.1),
    0 0 20px rgba(255, 255, 255, 1);
  animation: shooting linear infinite;
  opacity: 0;
}

.star::before {
  content: '';
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 300px;
  height: 1px;
  /* Flipped trail: Attached to the left side */
  /* Gradient from transparent (tail tip) to white (head connection) */
  background: linear-gradient(90deg, transparent, rgba(255,255,255,1));
  right: auto;
  left: 1px; /* Attached to left side of the star */
}

@keyframes shooting {
  0% {
    transform: rotate(315deg) translateX(0);
    opacity: 1;
  }
  70% {
    opacity: 1;
  }
  100% {
    transform: rotate(315deg) translateX(-1500px); /* Increased distance to ensure full crossing */
    opacity: 0;
  }
}
</style>
