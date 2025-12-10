<template>
  <div id="app">
    <nav class="main-nav">
      <router-link to="/Home">Home</router-link>
      <router-link to="/">Dashboard</router-link>
      <router-link to="/live">Live</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style>
.main-nav {
  display: flex;
  gap: 1rem;
  padding: 1rem 2rem;
  background-color: #2a2a2a;
  border-bottom: 2px solid #3a3a3a;
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
</style>
