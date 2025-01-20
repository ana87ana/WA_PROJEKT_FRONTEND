<template>
    <div class="body">
      <h1>E-scape room</h1>
      <div class="login-form">
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="email"><span class="a">EMAIL</span></label>
            <input type="text" id="email" v-model="email" required />
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
  import korisnici from '../podatci.js'; 
  
  export default {
    setup() {
      const email = ref('');
      const password = ref('');
      const router = useRouter();
  
      const submitForm = () => {
        const user = korisnici.find(
          (u) => u.email === email.value && u.password === password.value
        );
  
        if (user) {
          if (user.isAdmin) {
            console.log('Admin logged in');
            router.push('/'); 
          } else {
            console.log('Regular user logged in');
            router.push('/main_page'); 
          }
        } else {
          alert('Invalid email or password');
          console.error('Login failed');
        }
      };
  
      return {
        email,
        password,
        submitForm,
      };
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
    color: #c2e472;
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
  