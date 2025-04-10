<template>
  <div class="completion-page">
    <h1>Čestitamo! Završili ste sobu!</h1>
    <p>Vaše vrijeme: <strong>{{ formattedTime }}</strong></p>

    <div class="button-group">
      <button @click="goToLeaderboard">Go to Leaderboard</button>
      <button @click="goBackToMain">Back to All Rooms</button>
    </div>

    <p v-if="success" style="color: green;">Vrijeme uspješno spremljeno!</p>
    <p v-if="error" style="color: red;">{{ error }}</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTimerStore } from '../stores/timer.js';

const route = useRoute();
const router = useRouter();

const escapeRoomId = route.params.id;
const timer = useTimerStore();

const loading = ref(false);
const error = ref(null);
const success = ref(false);
const formattedTime = timer.formattedTime;
const user = ref(null); // optional if needed

const goToLeaderboard = () => {
  router.push(`/leaderboard/${escapeRoomId}`);
};

const goBackToMain = () => {
  router.push('/main_page');
};

const fetchUserData = async () => {
  try {
    const token = localStorage.getItem('jwt_token');
    if (!token) {
      error.value = 'Not logged in';
      return;
    }

    const res = await fetch('http://localhost:3000/user/account', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    user.value = data;
  } catch (err) {
    console.error('Error fetching user data:', err);
    error.value = 'Failed to fetch user data';
  }
};

onMounted(async () => {
  await fetchUserData();

  timer.stopTimer();
  const elapsedMilliseconds = timer.elapsed;
  timer.resetTimer();

  try {
    loading.value = true;

    const token = localStorage.getItem('jwt_token'); // make sure this matches the key you use in login

    const res = await fetch(`http://localhost:3000/escape_room/${escapeRoomId}/complete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ time: elapsedMilliseconds })
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    success.value = true;
  } catch (err) {
    console.error('Error saving completion time:', err);
    error.value = 'Greška pri spremanju vremena.';
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.completion-page {
  text-align: center;
  padding: 40px;
}

h1 {
  font-size: 32px;
  margin-bottom: 20px;
}

p {
  font-size: 24px;
  margin-bottom: 30px;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 40px;
}

button {
  width: 125px;
  padding: 10px;
  margin: 10px;
  background-color: #01233a;
  color: #72c2e4;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

button:hover {
  background-color: #01212c;
}
</style>
