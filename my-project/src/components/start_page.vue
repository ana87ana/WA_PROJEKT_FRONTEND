<template>
  <div class="start-page">
    <div class="card">
      <h1 class="title">{{ escapeRoom?.title?.toUpperCase() }}</h1>
      <p><b>Žanr:</b> {{ escapeRoom?.genre || 'N/A' }}</p>
      <p><b>Težina:</b> {{ escapeRoom?.difficulty || 'N/A' }}</p>
      <p class="description">{{ escapeRoom?.description || 'Opis nije dostupan.' }}</p>

      <div class="buttons">
        <button @click="startEscapeRoom">Započni</button>
        <button @click="goToLeaderboard">Pogledaj Leaderboard</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTimerStore } from '../stores/timer.js';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const escapeRoom = ref({});
    const timer = useTimerStore();

    const fetchEscapeRoom = async () => {
      try {
        const response = await fetch(`https://wa-projekt-backend-xm06.onrender.com/escape_room/${route.params.id}`);
        if (!response.ok) {
          throw new Error("Neuspjelo dohvaćanje sobe");
        }
        escapeRoom.value = await response.json();
      } catch (error) {
        console.error("Greška tijekom dohvaćanja sobe:", error);
      }
    };

    const startEscapeRoom = () => {
      if (escapeRoom.value.subrooms && escapeRoom.value.subrooms.length > 0) {
        const firstSubroom = escapeRoom.value.subrooms[0];
        timer.startTimer();
        router.push({
          path: `/subroom/${route.params.id}/${firstSubroom.type}`,
          query: { index: 0 }
        });
      }
    };

    const goToLeaderboard = () => {
      router.push(`/leaderboard/${route.params.id}`);
    };

    onMounted(fetchEscapeRoom);
    return { escapeRoom, startEscapeRoom, goToLeaderboard };
  }
};
</script>

<style scoped>
.start-page {
  display: flex;
  justify-content: center;
  padding: 40px 20px;
}

.card {
  background-color: #72c2e4;
  padding: 30px;
  border-radius: 12px;
  max-width: 600px;
  width: 100%;
  text-align: center;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.title {
  font-size: 36px;
  margin-bottom: 20px;
  color: #01233a;
}

.description {
  margin: 20px 0;
  font-size: 16px;
  line-height: 1.4;
  color: #01233a;
}

.buttons {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
}

button {
  padding: 12px 28px;
  background-color: #4e8199;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  max-width: 200px;
  width: 100%;
  word-wrap: break-word;
  text-align: center;
}

button:hover {
  background-color: #3a687b;
}

</style>
