<template>
  <div class="account-page">
    <div class="profile-section">
      <div class="profile-circle"></div>
      <div class="username">{{ username }}</div>

      <div class="button-group">
        <button @click="goHome">Početna</button>
        <button @click="logout">Odjava</button>
        <button v-if="isAdmin" @click="adminUsers" class="admin-btn">Svi korisnici</button>
        <button v-if="isAdmin" @click="createRoom" class="admin-btn">Stvori sobu</button>
      </div>
    </div>

    <div class="events-list">
      <div
        v-for="room in rooms"
        :key="room._id"
        class="event-item"
        @click="goToRoom(room._id)"
      >
        <div class="event-title">{{ room.title }}</div>
        <div class="event-time">Prvo rješenje: {{ formatTime(room.firstTime) }}</div>
        <div class="event-time">Najbrže vrijeme: {{ formatTime(room.fastestTime) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const username = ref("Korisnik");
    const rooms = ref([]);
    const router = useRouter();
    const isAdmin = ref(false);

    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("jwt_token");
        if (!token) {
          console.error("No token found, redirecting to login.");
          router.push("/");
          return;
        }

        try {
      const tokenParts = token.split('.');
      if (tokenParts.length === 3) {
        const payload = JSON.parse(atob(tokenParts[1]));
        isAdmin.value = !!payload.isAdmin;
      }
    } catch (err) {
      console.error("Error parsing token:", err);
    }

        const response = await fetch("http://localhost:3000/user/account", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        username.value = data.username;
        rooms.value = data.escapedRooms || [];
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const goToRoom = (roomId) => {
      router.push(`/room/${roomId}`);
    };

    const goHome = () => {
      router.push('/main_page');
    };

    const adminUsers = () => {
      router.push("/admin/users");
    };

    const createRoom = () => {
      router.push("/create_eroom");
    };

    const logout = () => {
      localStorage.removeItem("jwt_token");
      router.push("/");
    };

    const formatTime = (seconds) => {
  if (!seconds) return '0:00';
  
  const secs = typeof seconds === 'string' ? parseInt(seconds, 10) : seconds;
  
  if (isNaN(secs)) return '0:00';
  
  const minutes = Math.floor(secs / 60);
  const remainingSeconds = (secs % 60).toFixed(0);

rooms.value.forEach(room => {
    console.log(`Room ${room.title}: firstTime=${room.firstTime}, fastestTime=${room.fastestTime}`);
  });

  return `${minutes}:${remainingSeconds.padStart(2, '0')}`;
};

    onMounted(fetchUserData);

    return { username, rooms, isAdmin, goToRoom, goHome, adminUsers, createRoom, logout, formatTime };
  },
};
</script>

<style scoped>
.account-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;
}

.profile-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; 
  text-align: center;
}

.profile-circle {
  width: 150px;
  height: 150px;
  background-color: #01233a;
  border-radius: 50%;
  margin-bottom: 20px;
}

.username {
  font-size: 24px;
  font-weight: bold;
  color: #01233a;
  margin-bottom: 20px;
}

.button-group {
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
}

.button-group button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #72c2e4;
  color: #01233a;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  white-space: nowrap; 
  text-overflow: ellipsis;
  overflow: hidden;
  min-width: 150px; 
}

.button-group button:hover {
  background-color: #5ba7c9;
}

.events-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr); 
  gap: 30px;
  width: 80%;
  padding-bottom: 40px;
}

.event-item {
  background-color: #72c2e4;
  color: #01233a;
  border-radius: 8px;
  padding: 30px;
  text-align: center;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.event-item:hover {
  background-color: #5ba7c9;
}

.event-title {
  font-size: 18px;
  margin-bottom: 10px;
}

.event-time {
  font-size: 16px;
}
</style>