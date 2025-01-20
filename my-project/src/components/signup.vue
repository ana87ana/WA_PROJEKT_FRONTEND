<template>
    <div>
      <h1>E-scape room</h1>
      <form @submit.prevent="register">
        <div>
          <label for="username"><b>USERNAME:</b></label>
          <input type="text" v-model="username" required />
        </div>
        <div>
          <label for="email"><b>EMAIL:</b></label>
          <input type="email" v-model="email" required />
        </div>
        <div>
          <label for="password"><b>PASSWORD:</b></label>
          <input type="password" v-model="password" required />
        </div>
        <button type="submit"><b>CREATE</b></button>
      </form>
    </div>
  </template>
  
  <script>
  import korisnici from '../podatci.js'; 
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default {
    setup() {
      const username = ref('');
      const email = ref('');
      const password = ref('');
      const router = useRouter();
  
      const register = () => {
        const existingUser = korisnici.find((user) => user.email === email.value);
  
        if (existingUser) {
          alert('Email already registered!');
          return;
        }
  
        const newUser = {
          id: Date.now(), 
          username: username.value,
          email: email.value,
          password: password.value,
          isAdmin: false, 
        };
  
        korisnici.push(newUser); 
        alert('User registered successfully!');
  
        router.push('/account');
      };
  
      return {
        username,
        email,
        password,
        register,
      };
    },
  };
  </script>
  
  <style>
  h1 {
    color: #4e8199;
    font-size: 60px;
  }
  
  label {
    display: block;
    color: #01233a;
    margin-bottom: 10px;
    margin-top: 10px;
  }
  
  input[type="text"],
  input[type="password"],
  input[type="email"] {
    width: 500px;
    padding: 8px;
    background-color: #72c2e4;
    border: 1px solid #72c2e4;
    border-radius: 3px;
  }
  
  button {
    width: 100px;
    padding: 10px;
    margin: 10px;
    background-color: #4e8199;
    color: #f4c8ca;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #01233a;
  }
  </style>
  