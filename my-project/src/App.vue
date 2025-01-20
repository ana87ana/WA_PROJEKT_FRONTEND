<script setup>
import HelloWorld from './components/HelloWorld.vue';
import Login from './components/login.vue';
</script>

<template>
  <div>
    <router-view />
  </div>
</template>

<style scoped>
.nav-link {
  margin-right: 10px;
  text-decoration: none;
  color: #42b883;
  font-weight: bold;
}

.nav-link:hover {
  text-decoration: underline;
  color: #35495e;
}

body {
  font-family: Arial, sans-serif;
}
</style>

