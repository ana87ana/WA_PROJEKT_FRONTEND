<template>
  <div class="event-list">
    <h1><b>ESCAPE ROOMS</b></h1>

    <div class="controls">
      <select v-model="selectedGenre">
        <option value="">Svi žanrovi</option>
        <option v-for="genre in uniqueGenres" :key="genre" :value="genre">
          {{ genre }}
        </option>
      </select>

      <select v-model="sortOrder">
        <option value="asc">Sortiranje po težini: Od manje težih soba</option>
        <option value="desc">Sortiranje po težini: Od više težih soba</option>
      </select>
    </div>

    <div class="events">
      <div 
        v-for="room in filteredAndSortedRooms" 
        :key="room._id" 
        class="event-card" 
        @click="goToRoom(room._id)"
      >
        <h2>{{ room.title.toUpperCase() }}</h2>
        <p><b>Žanr:</b> {{ room.genre }}</p>
        <p><b>Težina:</b> {{ room.difficulty }}</p>
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
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const sobe = ref([]);
    const router = useRouter();
    const selectedGenre = ref("");
    const sortOrder = ref("asc");

    const fetchRooms = async () => {
      try {
        const response = await fetch("https://wa-projekt-backend-xm06.onrender.com/escape_room"); 
        if (!response.ok) {
          throw new Error("Nije uspjelo dohvaćanje stranice");
        }
        const data = await response.json();
        sobe.value = data;
      } catch (error) {
        console.error("Greška tijekom povezivanja: ", error);
      }
    };

    const goToRoom = (id) => {
      router.push(`/room/${id}`);
    };

    const uniqueGenres = computed(() => {
      const genres = new Set(sobe.value.map((room) => room.genre));
      return Array.from(genres);
    });

    const filteredAndSortedRooms = computed(() => {
      let filteredRooms = sobe.value;

      if (selectedGenre.value) {
        filteredRooms = filteredRooms.filter(room => room.genre === selectedGenre.value);
      }

      return filteredRooms.sort((a, b) => 
        sortOrder.value === "asc" ? a.difficulty - b.difficulty : b.difficulty - a.difficulty
      );
    });

    onMounted(fetchRooms);

    return {
      sobe,
      goToRoom,
      selectedGenre,
      sortOrder,
      uniqueGenres,
      filteredAndSortedRooms, 
    };
  },
};
</script>

<style scoped>
.event-list {
  padding: 20px;
  text-align: center;
  margin-top: -10px; 
}

.events {
  display: grid;
  grid-template-columns: repeat(3, 1fr); 
  gap: 30px;
  justify-items: center;
  margin-top: 30px;
}

.event-card {
  background-color: #4e8199;
  color: #01233a;
  border-radius: 12px;
  padding: 25px;
  width: 220px;
  height: 180px;
  display: flex;
  flex-direction: column; 
  align-items: center;
  justify-content: center;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.event-card h2 {
  margin: 0;
  font-size: 20px;
}

.event-card p {
  margin: 6px 0;
  font-size: 14px;
}

.event-card:hover {
  transform: scale(1.05);
}

.circle {
  position: fixed;
  top: 15px;
  right: 15px;
  width: 55px;
  height: 55px;
  background-color: #72c2e4;
  border-radius: 50%;
  cursor: pointer;
}

</style>
