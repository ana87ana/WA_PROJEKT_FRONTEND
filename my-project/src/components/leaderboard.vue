<template>
  <div class="event-detail">
    <div class="event-card">
      <h1 v-if="escapeRoomName">{{ escapeRoomName.toUpperCase() }}</h1>
    </div>

    <div class="user-list">
      <div v-for="(user, index) in sortedLeaderboard" :key="index" class="user-item">
        <span class="user-number">{{ index + 1 }}. </span>
        <span class="username">{{ user.username }}</span>
        <span class="time">{{ formatTime(user.firstTime) }}</span>
      </div>
    </div>

    <div class="account-link">
      <router-link to="/account">
        <div class="circle"></div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const escapeRoomName = ref('');
    const leaderboard = ref([]);

    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(`http://localhost:3000/escape_room/leaderboard/${route.params.id}`);
        if (!response.ok) {
          throw new Error('Neuspjelo dohvaćanje podataka sobe');
        }
        const data = await response.json();
        escapeRoomName.value = data.roomName; 
        leaderboard.value = data.leaderboard || []; 
      } catch (error) {
        console.error('Greška pri dohvaćanju leaderborda:', error);
      }
    };

    const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = (seconds % 60).toFixed(0);
  return `${minutes}:${remainingSeconds.padStart(2, '0')}`;
};

    const sortedLeaderboard = computed(() => {
  return [...leaderboard.value].sort((a, b) => a.firstTime - b.firstTime); 
});

    onMounted(fetchLeaderboard);
    return { escapeRoomName, sortedLeaderboard, formatTime };
  }
};
</script>

<style scoped>
.event-detail {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.event-card {
  background-color: #72c2e4;
  width: 100%;
  max-width: 600px;
  padding: 20px;
  text-align: center;
  border-radius: 12px;
  margin-bottom: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.event-card h1 {
  font-size: 32px;
  color: #01233a;
  margin: 0;
}

.user-list {
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.user-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #e0f3fa;
  padding: 12px 18px;
  border-radius: 10px;
  font-size: 18px;
  color: #01233a;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.user-number {
  font-weight: bold;
  margin-right: 10px;
}

.username {
  flex-grow: 1;
  text-align: left;
  min-width: 150px; 
}

.time {
  text-align: right;
  font-weight: bold;
}

.account-link {
  position: absolute;
  top: 15px;
  right: 15px;
}

.circle {
  width: 55px;
  height: 55px;
  background-color: #72c2e4;
  border-radius: 50%;
  cursor: pointer;
}
</style>

