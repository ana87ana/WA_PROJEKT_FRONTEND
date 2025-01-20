<template>
    <div class="account-page">
      <div class="left-third">
        <div class="profile-circle"></div>
        <div class="username">{{ username }}</div>
      </div>
  
      <div class="right-two-thirds">
        <div class="events-list">
          <div v-for="room in rooms" :key="room.id" class="event-item">
            {{ room.id }}
          </div>
        </div>
      </div>
      <div class="account-link">
        <router-link to="/leaderboard">
          <div class="circle"></div>
        </router-link>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    setup() {
      const username = ref("Korisnik");
  
      const rooms = ref([
        { id: "Room 1" },
        { id: "Room 2" },
        { id: "Room 3" },
        { id: "Room 4" },
        { id: "Room 5" },
      ]);
  
      return {
        username,
        rooms,
      };
    },
  };
  </script>
  
  <style scoped>
  .account-page {
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
  }
  
  .left-third {
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }
  
  .profile-circle {
    width: 150px;
    height: 150px;
    background-color: #01233a; 
    border-radius: 50%;
    margin-top: 40px; 
    margin-left: 280px;
  }
  
  .username {
    margin-top: 20px;
    margin-left: 265px;
    font-size: 20px;
    font-weight: bold;
    color: #01233a;
  }
  
  .right-two-thirds {
    margin-top: 100px;
    padding: 20px;
  }
  
  .events-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr); 
    gap: 40px;
  }
  
  .event-item {
    background-color: #72c2e4; 
    color: #01233a; 
    border-radius: 8px;
    padding: 40px;
    text-align: center;
    font-weight: bold;
    border: 1px solid #01233a;
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
  