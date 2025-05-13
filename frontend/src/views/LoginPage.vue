<template>
  <div class="auth-container">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div>
        <label for="email">Email</label>
        <input type="email" v-model="email" id="email" required />
      </div>
      <div>
        <label for="password">Mot de passe </label>
        <input type="password" v-model="password" id="password" required />
      </div>
      <div>
        <button type="submit">Login</button>
        <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
      </div>
    </form>
    <p>Vous n'avez pas de compte ? <router-link to="/register">S'inscrire</router-link></p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
       errorMessage: '', 
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:5000/api/auth/login', {
          email: this.email,
          password: this.password,
        });
        localStorage.setItem('token', response.data.token);
        this.$router.push('/tasks');
      } catch (error) {
  if (error.response && error.response.data && error.response.data.message) {
    this.errorMessage = error.response.data.message;
  } else {
    this.errorMessage = "Une erreur est survenue.";
  }
}
    },
  },
};
</script>

<style scoped>
.auth-container {
  width: 300px;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
form div {
  margin-bottom: 1rem;
}
input {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
}
button {
  width: 100%;
  padding: 10px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
}
</style>
