<template>
    <div class="event-list">
      <h1><b>EVENTS</b></h1>
      <div class="events">
        <div 
          v-for="room in sobe" 
          :key="room.id" 
          class="event-card" 
          @click="goToRoom(room.id)"
        >
          <h2>{{ room.name.toUpperCase() }}</h2>
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
  import { ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import rooms from '../escape_rooms.js'; 
  
  export default {
    setup() {
      const sobe = ref(rooms);
      const router = useRouter();
  
      const goToRoom = (id) => {
        router.push(`/rooms/${id}`);
      };
  
      return {
        goToRoom,
        sobe
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
  