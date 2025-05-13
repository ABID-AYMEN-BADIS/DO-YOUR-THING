<template>
  <div class="change-password">
    <div class="task-list">
      <h2>Changer le mot de passe</h2>
      <div class="create-task-form">
        <form @submit.prevent="handleChangePassword">
          <div class="form-group">
            <label for="new-password">Nouveau mot de passe</label>
            <input v-model="newPassword" id="new-password" type="password" placeholder="Nouveau mot de passe" required />
          </div>
          <div class="form-group">
            <label for="confirm-password">Confirmer le mot de passe</label>
            <input v-model="confirmPassword" id="confirm-password" type="password" placeholder="Confirmer le mot de passe" required />
          </div>
          <div class="form-actions">
            <button type="submit" class="btn-submit">Changer</button>
          </div>
        </form>
      </div>

      <div v-if="error" class="error-message">
        <p>{{ error }}</p>
      </div>
      <div v-if="success" class="success-message">
        <p>{{ success }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      newPassword: '',
      confirmPassword: '',
      error: '',
      success: ''
    };
  },
  methods: {
    async handleChangePassword() {
      this.error = '';
      if (this.newPassword !== this.confirmPassword) {
        this.error = "Les mots de passe ne correspondent pas";
        return;
      }

      try {
        const token = localStorage.getItem('token');
        await axios.put('http://localhost:5000/api/auth/password', 
          { newPassword: this.newPassword }, 
          { headers: { Authorization: `Bearer ${token}` } }
        );
        this.success = "Mot de passe changé avec succès";
      } catch (err) {
        this.error = err.response.data.message || "Erreur";
      }
    }
  }
};
</script>

<style scoped>
.change-password {
  padding: 2rem;
  background-color: #f4f6f9;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

h2 {
  font-size: 32px;
  font-weight: bold;
  color: #333;
}

.create-task-form {
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
  margin-top: 20px;
}

.create-task-form form {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-size: 16px;
  color: #333;
  margin-bottom: 8px;
}

.form-group input {
  padding: 5px;
  border-radius: 6px;
  border: 1px solid #ccc;
  width: 100%;
  font-size: 14px;
  background-color: #f9f9f9;
  transition: border-color 0.3s;
}

.form-group input:focus {
  border-color: #42b983;
  background-color: #fff;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
}

.btn-submit {
  background-color: #42b983;
  color: white;
  padding: 12px 20px;
  border-radius: 6px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-submit:hover {
  background-color: #369f6c;
}

.error-message, .success-message {
  font-size: 14px;
  color: #ff4d4d;
  margin-top: 1rem;
}

.success-message {
  color: #42b983;
}
</style>
