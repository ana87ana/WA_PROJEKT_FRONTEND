<script setup>
import HelloWorld from './components/HelloWorld.vue';
import Login from './components/login.vue';
import { useTimerStore } from './stores/timer.js';

const timer = useTimerStore();
</script>

<template>
  <div>
    <div v-if="timer.startTime" class="timer-display">
      ⏱️ Vrijeme: {{ timer.formattedTime }}
    </div>
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

.timer-display {
  position: fixed;
  top: 20px;
  right: 20px;
  background: #01233a;
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  z-index: 9999;
  font-weight: bold;
  font-family: monospace;
}
</style>
