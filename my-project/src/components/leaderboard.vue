<template>
  <div class="event-detail">
    <div class="event-card">
      <h1>{{ escapeRoomName.toUpperCase() }}</h1>
    </div>

    <div class="user-list">
      <div v-for="(user, index) in sortedLeaderboard" :key="index" class="user-item">
        <span class="user-number">{{ index + 1 }}. </span>
        <span class="username">{{ user.username }}</span>
        <span class="time">{{ formatTime(user.time) }}</span>
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
        escapeRoomName.value = data.title; // Get the escape room title
        leaderboard.value = data.leaderboard || []; // Get leaderboard from the room data
      } catch (error) {
        console.error('Greška pri dohvaćanju leaderborda:', error);
      }
    };

    const formatTime = (milliseconds) => {
      const minutes = Math.floor(milliseconds / 60000);
      const seconds = ((milliseconds % 60000) / 1000).toFixed(0);
      return `${minutes}:${seconds.padStart(2, '0')}`;
    };

    const sortedLeaderboard = computed(() => {
      return [...leaderboard.value].sort((a, b) => a.time - b.time); // Sorting by time (fastest first)
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
  width: 250%;
  padding: 20px;
  text-align: center;
  border-radius: 8px;
  margin-bottom: 20px;
}

.event-card h1 {
  font-size: 32px;
  color: #01233a;
}

.user-list {
  width: 250%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.user-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #72c2e4;
  padding: 10px;
  border-radius: 8px;
  font-size: 16px;
  color: #01233a;
}

.user-number {
  font-weight: bold;
}

.username {
  flex-grow: 1;
  text-align: left;
}

.time {
  text-align: right;
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
