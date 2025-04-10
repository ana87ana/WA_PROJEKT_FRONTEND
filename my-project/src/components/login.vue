<template>
  <div class="body">
    <h1>E-scape room</h1>
    <div class="login-form">
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="username"><span class="a">USERNAME</span></label>
          <input type="text" id="username" v-model="username" required />
        </div>
        <div class="form-group">
          <label for="password"><span class="a">PASSWORD</span></label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit"><b>LOGIN</b></button>
      </form>
    </div>
    <h3>Nemate račun? Stvorite ga <router-link to="/signup">ovdje!</router-link></h3>
    <h3>
      Ako imate ikakvih problema, možete kontaktirati admina ovdje: 
      <span class="b">admin@gmail.com</span>
    </h3>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const username = ref('');
    const password = ref('');
    const router = useRouter();

    const submitForm = async () => {
      try {
        const response = await fetch('https://wa-projekt-backend-xm06.onrender.com/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: username.value, password: password.value }),
        });

        if (!response.ok) {
          alert('Neuspješna prijava! Provjerite korisničko ime i lozinku.');
          return;
        }

        const data = await response.json();
        localStorage.setItem('jwt_token', data.jwt_token); 
        console.log('Login response:', response)

        console.log('User logged in');
        router.push('/main_page'); 
      } catch (error) {
        console.error('Greška pri prijavi:', error);
        alert('Došlo je do greške pri prijavi.');
      }
    };

    return { username, password, submitForm };
  },
};
</script>

<style>
h1 {
  color: #4e8199;
  font-size: 60px;
}

.a {
  color: #01233a;
  font-size: 20px;
  font-weight: bold;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="text"],
input[type="password"] {
  width: 350px;
  padding: 8px;
  background-color: #72c2e4;
  border: 1px solid #72c2e4;
  border-radius: 3px;
}

button {
  width: 75px;
  align-content: left;
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

h3 {
  color: #01212c;
  align-content: center;
}

.b {
  color: #72c2e4;
}

body,
html {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  background-color:#baeaff;
}

.body {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
