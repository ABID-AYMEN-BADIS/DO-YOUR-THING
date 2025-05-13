<template>
  <div class="task-details">
    <h2>Modifie la tâche sélectionnée</h2>
    <form @submit.prevent="updateTask" class="form-container">
      <div class="form-group">
        <label for="title">Titre</label>
        <input type="text" v-model="task.title" id="title" required class="input-field" />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <textarea v-model="task.description" id="description" required class="input-field"></textarea>
      </div>
      <div class="form-group">
        <button type="submit" class="btn-submit">Mettre à jour</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      task: {
        title: '',
        description: '',
      },
    };
  },
  async mounted() {
    const id = this.$route.params.id;
    const token = localStorage.getItem('token');
    const response = await axios.get(`http://localhost:5000/api/tasks/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    this.task = response.data;
  },
  methods: {
    async updateTask() {
      const id = this.$route.params.id;
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        this.task,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      this.$router.push('/tasks');
    },
  },
};
</script>

<style scoped>
.task-details {
  padding: 2rem;
  background-color: #f4f6f9;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

h2 {
  font-size: 28px;
  color: #333;
  font-weight: 600;
}

.form-container {
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  font-size: 16px;
  color: #333;
  font-weight: 500;
}

.input-field {
  width: 100%;
  padding: 12px;
  margin-top: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 14px;
  color: #333;
  background-color: #f9f9f9;
  transition: border-color 0.3s;
}

.input-field:focus {
  border-color: #42b983;
  outline: none;
  background-color: #fff;
}

.btn-submit {
  width: 100%;
  padding: 12px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-submit:hover {
  background-color: #369f6c;
}
</style>
