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
        v-for="room in sobe" 
        :key="room._id" 
        class="event-card" 
        @click="goToRoom(room._id)"
      >
        <h2>{{ room.name.toUpperCase() }}</h2>
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
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const sobe = ref([]); 
    const router = useRouter();

    const fetchRooms = async () => {
      try {
        const response = await fetch("http://localhost:3000/escape_room");
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
      router.push(`/rooms/${id}`);
    };

    onMounted(fetchRooms); 

    return {
      goToRoom,
      sobe,
    };
  },
};
</script>

<style scoped>
.event-list {
  padding: 20px;
  text-align: center;
}

.events {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  justify-items: center;
}

.event-card {
  background-color: #4e8199;
  color: #01233a;
  border-radius: 8px;
  padding: 20px;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s;
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
