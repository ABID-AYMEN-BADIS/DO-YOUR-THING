<template>
  <div class="delete-account">
    <div class="task-list">
      <h2>Supprimer le compte</h2>
      <div class="create-task-form">
        <p>Cette action est irréversible. Êtes-vous sûr ?</p>
        <div class="form-actions">
          <button @click="handleDeleteAccount" class="btn-delete">Oui, supprimer mon compte</button>
        </div>
      </div>

      <div v-if="message" class="message">
        <p>{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return { message: '' };
  },
  methods: {
    async handleDeleteAccount() {
      try {
        const token = localStorage.getItem('token');
        await axios.delete('http://localhost:5000/api/auth/account', {
          headers: { Authorization: `Bearer ${token}` }
        });
        localStorage.removeItem('token');
        this.message = "Compte supprimé. Redirection...";
        setTimeout(() => this.$router.push('/login'), 2000);
      } catch (err) {
        this.message = err.response?.data?.message || "Erreur lors de la suppression";
      }
    }
  }
};
</script>

<style scoped>
.delete-account {
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

.create-task-form p {
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
}

.btn-delete {
  background-color: #ff4d4d;
  color: white;
  padding: 12px 20px;
  border-radius: 6px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-delete:hover {
  background-color: #ff3333;
}

.message {
  font-size: 14px;
  color: #42b983;
  margin-top: 1rem;
}
</style>
