<template>
  <div class="auth-container">
    <h2>S'inscrire</h2>
    <form @submit.prevent="register">
      <div>
        <label for="email">Email</label>
        <input type="email" v-model="email" id="email" required />
     
      </div>
      <div>
        <label for="password">Mot de passe </label>
        <input type="password" v-model="password" id="password" required />
        
      </div>
       <div>
        <label for="password">Confirmer votre Mot de passe </label>
        <input type="password" v-model="confirmedpassword" id="password"  />
        
      </div>
      <div>
        <button type="submit">s'inscrire</button>
        <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
      </div>
    </form>
    <p>Vous avez déja un compte? <router-link to="/login">Login</router-link></p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      confirmedpassword:'',
      errorMessage: '', 
    };
  },
  methods: {
    async register() {
      try {
        await axios.post('http://localhost:5000/api/auth/register', {
  email: this.email,
  password: this.password,
  confirmedpassword:this.confirmedpassword,
});
        this.$router.push('/login');
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
