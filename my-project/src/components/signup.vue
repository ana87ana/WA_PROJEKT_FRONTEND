<template>
  <div class="signup-container">
    <h1>SIGN UP</h1>
    <form @submit.prevent="registerUser">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="username" type="text" placeholder="Username" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <input v-model="confirmPassword" type="password" placeholder="Confirm Password" required />
      <button type="submit">REGISTER</button>
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
        const response = await fetch("https://wa-projekt-backend-xm06.onrender.com/register", {
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
.signup-container {
  max-width: 500px;
  margin: auto;
  padding: 20px;
  text-align: center;
  border-radius: 8px;
}
input::placeholder {
  color: #073a5e;
  font-size: 16px;
  opacity: 1; 
}
input {
  width: 90%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #72c2e4;
  color: #073a5e;

}
button {
  width: 100px;
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
.error {
  color: red;
  margin-top: 10px;
}
</style>
