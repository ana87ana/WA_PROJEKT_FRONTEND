<template>
  <div class="login-container">
    <h1>Sign Up</h1>
    <form @submit.prevent="registerUser">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="username" type="text" placeholder="Username" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <input v-model="confirmPassword" type="password" placeholder="Confirm Password" required />
      <button type="submit">Register</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const email = ref('');
    const username = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const errorMessage = ref('');
    const router = useRouter();

    const registerUser = async () => {
      if (password.value !== confirmPassword.value) {
        errorMessage.value = "Passwords do not match";
        return;
      }
      try {
        const response = await fetch("http://localhost:3000/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email.value,
            username: username.value,
            password: password.value,
            confirmPassword: confirmPassword.value
          }),
        });

        if (!response.ok) {
          throw new Error(await response.text());
        }

        alert("User successfully registered!");
        router.push("/main_page");
      } catch (error) {
        errorMessage.value = error.message;
      }
    };

    return { email, username, password, confirmPassword, registerUser, errorMessage };
  },
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  text-align: center;
  background: #f4f4f4;
  border-radius: 8px;
}
input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}
button {
  width: 100%;
  padding: 10px;
  background: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}
.error {
  color: red;
  margin-top: 10px;
}
</style>
