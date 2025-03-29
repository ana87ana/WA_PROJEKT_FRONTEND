<template>
  <div class="start-page">
    <h1>{{ escapeRoom.title }}</h1>
    <p><b>Žanr:</b> {{ escapeRoom.genre }}</p>
    <p><b>Težina:</b> {{ escapeRoom.difficulty }}</p>
    <p>{{ escapeRoom.description }}</p>
    <button @click="startEscapeRoom">Započni</button>
    <button @click="goToLeaderboard">Pogledaj Leaderboard</button>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const escapeRoom = ref({});

    const fetchEscapeRoom = async () => {
      try {
        const response = await fetch(`http://localhost:3000/escape_room/${route.params.id}`);
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
  text-align: center;
  padding: 20px;
}
button {
  padding: 10px 20px;
  background-color: #4e8199;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
}
button:hover {
  background-color: #3a687b;
}
</style>
