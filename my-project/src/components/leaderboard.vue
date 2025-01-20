<template>
    <div class="event-detail">
      <div class="event-card">
        <h1>{{ name.toUpperCase() }}</h1>
      </div>
  
      <div class="user-list">
        <div v-for="(userItem, index) in users" :key="index" class="user-item">
          <span class="user-number">{{ index + 1 }}. </span>
          <span class="username">{{ userItem.id }}</span>
          <span class="time">{{ userItem.time }}</span>
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
  import { ref } from 'vue';
  
  export default {
    setup() {
      const name = ref("Room1");
  
      const users = ref([
        { id: "User1", time: "3:21" },
        { id: "User2", time: "2:28" },
        { id: "User3", time: "4:21"},
        { id: "User4", time: "2:57" },
        { id: "User5", time: "3:33" },
      ]);
  
      return {
        name, 
        users
      };
    },
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
  