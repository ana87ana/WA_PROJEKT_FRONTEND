<template>
  <div class="admin-panel">
    <h1>Admin Panel - Korisnici</h1>
    
    <div v-if="loading" class="loading">
      Učitavanje korisnika...
    </div>
    
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    
    <div v-else>
      <div class="filters">
        <input 
          v-model="searchTerm" 
          type="text" 
          placeholder="Pretraži korisnike..."
          class="search-input"
        />
      </div>
      
      <table class="users-table">
        <thead>
          <tr>
            <th>Korisničko ime</th>
            <th>Email</th>
            <th>ID</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredUsers" :key="user._id">
            <td>{{ user.username }}</td>
            <td>{{ user.email }}</td>
            <td class="id-cell">{{ user._id }}</td>
          </tr>
        </tbody>
      </table>
      
      <div v-if="selectedUser" class="user-details-modal">
        <div class="modal-content">
          <div class="modal-header">
            <h2>Detalji korisnika: {{ selectedUser.username }}</h2>
            <button @click="closeDetails" class="close-btn">&times;</button>
          </div>
          <div class="modal-body">
            <p><strong>Email:</strong> {{ selectedUser.email }}</p>
            <p><strong>ID:</strong> {{ selectedUser._id }}</p>
            
            <div v-if="selectedUser.escapedRooms && selectedUser.escapedRooms.length > 0">
              <h3>Završene sobe:</h3>
              <table class="escaped-rooms-table">
                <thead>
                  <tr>
                    <th>ID Sobe</th>
                    <th>Prvo vrijeme</th>
                    <th>Najbolje vrijeme</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(room, index) in selectedUser.escapedRooms" :key="index">
                    <td>{{ room.escapeRoomId }}</td>
                    <td>{{ formatTime(room.firstTime) }}</td>
                    <td>{{ formatTime(room.fastestTime) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-else>
              <p>Korisnik nije završio nijednu sobu.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="navigation">
      <button @click="goToMainPage" class="back-btn">Natrag na početnu</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const users = ref([]);
const loading = ref(true);
const error = ref(null);
const searchTerm = ref('');
const selectedUser = ref(null);

const fetchUsers = async () => {
  try {
    loading.value = true;
    
    const token = localStorage.getItem('jwt_token');
    if (!token) {
      router.push('/');
      return;
    }
    
    const response = await fetch('https://wa-projekt-backend-xm06.onrender.com/admin/users', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      if (response.status === 401) {
        error.value = 'Nije dozvoljeno. Samo administratori imaju pristup.';
        router.push('/main_page');
        return;
      }
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    users.value = data;
  } catch (err) {
    console.error('Error fetching users:', err);
    error.value = 'Greška prilikom dohvaćanja korisnika.';
  } finally {
    loading.value = false;
  }
};

// Check if user is admin before loading page
const checkAdminStatus = async () => {
  try {
    const token = localStorage.getItem('jwt_token');
    if (!token) {
      router.push('/');
      return;
    }
    
    // Decode token to check admin status
    // This is a simple way to check without making an API call
    // In production, you might want a proper endpoint to verify admin status
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
      router.push('/main_page');
      return;
    }
    
    const payload = JSON.parse(atob(tokenParts[1]));
    if (!payload.isAdmin) {
      router.push('/main_page');
      return;
    }
    
    // If admin, fetch users
    await fetchUsers();
  } catch (err) {
    console.error('Error checking admin status:', err);
    router.push('/main_page');
  }
};

const filteredUsers = computed(() => {
  if (!searchTerm.value) return users.value;
  
  const term = searchTerm.value.toLowerCase();
  return users.value.filter(user => 
    user.username.toLowerCase().includes(term) || 
    (user.email && user.email.toLowerCase().includes(term))
  );
});

const viewDetails = (user) => {
  selectedUser.value = user;
};

const closeDetails = () => {
  selectedUser.value = null;
};

const formatTime = (seconds) => {
  if (!seconds) return '0:00';
  
  // Convert string to number if it's a string
  const secs = typeof seconds === 'string' ? parseInt(seconds, 10) : seconds;
  
  if (isNaN(secs)) return '0:00';
  
  const minutes = Math.floor(secs / 60);
  const remainingSeconds = (secs % 60).toFixed(0);
  return `${minutes}:${remainingSeconds.padStart(2, '0')}`;
};

const goToMainPage = () => {
  router.push('/main_page');
};

onMounted(checkAdminStatus);
</script>

<style scoped>
.admin-panel {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: #01233a;
}

h1 {
  color: #01233a;
  text-align: center;
  margin-bottom: 30px;
}

.loading, .error {
  text-align: center;
  padding: 20px;
  font-size: 18px;
}

.error {
  color: red;
}

.filters {
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #72c2e4;
  border-radius: 4px;
  font-size: 16px;
}

.users-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.users-table th, .users-table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.users-table th {
  background-color: #72c2e4;
  color: #01233a;
  font-weight: bold;
}

.users-table tr:hover {
  background-color: #f5f5f5;
}

.id-cell {
  font-family: monospace;
  font-size: 14px;
}

.actions {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.btn-view {
  background-color: #72c2e4;
  color: #01233a;
}

.btn-view:hover {
  background-color: #5ba7c9;
}

.user-details-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  border-radius: 8px;
  width: 80%;
  max-width: 800px;
  max-height: 80vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #ddd;
  background-color: #72c2e4;
  color: #01233a;
  border-radius: 8px 8px 0 0;
}

.modal-body {
  padding: 20px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #01233a;
}

.escaped-rooms-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
}

.escaped-rooms-table th, .escaped-rooms-table td {
  padding: 8px 10px;
  border: 1px solid #ddd;
  text-align: left;
}

.escaped-rooms-table th {
  background-color: #f0f0f0;
}

.navigation {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.back-btn {
  padding: 10px 20px;
  background-color: #01233a;
  color: #72c2e4;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.back-btn:hover {
  background-color: #01212c;
}
</style>