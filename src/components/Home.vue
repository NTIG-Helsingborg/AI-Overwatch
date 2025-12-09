<script setup>
import { ref } from 'vue'
</script>

<template>
<nav>
  <router-link to="/">Home</router-link>
  <router-link to="/about">About</router-link>
</nav>
<router-view />
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
