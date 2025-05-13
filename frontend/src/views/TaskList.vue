<template>
  <div class="task-list">
    <div class="menu-icon">
      <button @click="toggleMenu">☰</button>
      <div v-if="showMenu" class="menu-dropdown">
        <router-link to="/change-password">Changer le mot de passe</router-link>
        <router-link to="/delete-account">Supprimer le compte</router-link>
        <button @click="logout">Déconnexion</button>
      </div>
    </div>

    <h2>Vos Tâches</h2>

    <!-- Bouton pour afficher ou cacher le formulaire de création -->
    <button @click="showCreateForm = !showCreateForm" class="btn-create-task">
      {{ showCreateForm ? 'Annuler' : 'Créer une nouvelle Tâche' }}
    </button>

    <!-- Formulaire de création de tâche -->
    <div v-if="showCreateForm" class="create-task-form">
      <form @submit.prevent="createTask">
        <div class="form-group">
          <label for="title">Titre de la tâche</label>
          <input v-model="newTask.title" id="title" type="text" required placeholder="Entrez le titre de la tâche" />
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <textarea v-model="newTask.description" id="description" required placeholder="Entrez la description de la tâche"></textarea>
        </div>
        <div class="form-actions">
          <button type="submit" class="btn-submit">Créer la tâche</button>
        </div>
      </form>
    </div>

    <div v-if="selectedTasks.length > 0" class="action-bar">
      <button @click="markAsCompleted" class="btn-complete">✔️ Terminer</button>
    </div>

    <ul class="task-list-items">
      <li v-for="task in tasks" :key="task.id" class="task-item">
        <input type="checkbox" :value="task.id" v-model="selectedTasks" class="task-checkbox" />
        <div class="task-details">
          <h3 :style="{ textDecoration: task.completed ? 'line-through' : 'none' }">{{ task.title }}</h3>
          <p>{{ task.description }}</p>
        </div>
        <div class="task-actions">
          <button @click="deleteTask(task.id)" class="btn-delete">Supprimer</button>
          <router-link :to="'/tasks/' + task.id" class="btn-edit">Modifier</router-link>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      tasks: [],
      selectedTasks: [],
      showMenu: false,
      showCreateForm: false, // Toggle form visibility
      newTask: {
        title: '',
        description: '',
      },
    };
  },
  mounted() {
    this.fetchTasks();
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    },
    async fetchTasks() {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/tasks', {
        headers: { Authorization: `Bearer ${token}` }
      });
      this.tasks = response.data.tasks;
    },
    async createTask() {
      const { title, description } = this.newTask;
      if (title && description) {
        const token = localStorage.getItem('token');
        await axios.post('http://localhost:5000/api/tasks', { title, description }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.fetchTasks(); // Update the task list
        this.showCreateForm = false; // Close form after submission
        this.newTask = { title: '', description: '' }; // Reset form fields
      }
    },
    async deleteTask(id) {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      this.fetchTasks();
    },
    async markAsCompleted() {
      for (const id of this.selectedTasks) {
        await axios.put(`http://localhost:5000/api/tasks/${id}/complete`, {}, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
      }
      this.selectedTasks = [];
      this.fetchTasks();
    },
    async bulkDelete() {
      for (const id of this.selectedTasks) {
        await this.deleteTask(id);
      }
      this.selectedTasks = [];
    }
  }
};
</script>

<style scoped>
.task-list {
  padding: 2rem;
  background-color: #f4f6f9;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.menu-icon {
  position: absolute;
  top: 20px;
  right: 20px;
}

.menu-dropdown {
  position: absolute;
  right: 0;
  top: 40px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 15px;
  width: 240px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.menu-dropdown a {
  color: #333;
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.menu-dropdown a:hover {
  background-color: #f5f5f5;
}

.menu-icon button {
  background-color: #42b983;
  color: white;
  font-size: 20px;
  padding: 12px 18px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.menu-icon button:hover {
  background-color: #369f6c;
}

.menu-dropdown button {
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 12px;
  cursor: pointer;
  font-size: 16px;
}

.menu-dropdown button:hover {
  background-color: #369f6c;
}

h2 {
  font-size: 32px;
  font-weight: bold;
  color: #333;
}

.btn-create-task {
  background-color: #42b983;
  color: white;
  padding: 12px 20px;
  border-radius: 6px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-create-task:hover {
  background-color: #369f6c;
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

.form-group input,
.form-group textarea {
  padding: 5px;
  border-radius: 6px;
  border: 1px solid #ccc;
  width: 100%;
  font-size: 14px;
  background-color: #f9f9f9;
  transition: border-color 0.3s;
}

.form-group input:focus,
.form-group textarea:focus {
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

.action-bar {
  display: flex;
  justify-content: flex-start;
  gap: 12px;
}

.btn-complete {
  background-color: #42b983;
  color: white;
  padding: 12px 20px;
  border-radius: 6px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-complete:hover {
  background-color: #369f6c;
}

ul.task-list-items {
  list-style: none;
  width: 100%;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.task-item {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.task-item:hover {
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

.task-details {
  margin-bottom: 15px;
}

.task-details h3 {
  font-size: 20px;
  font-weight: 600;
  color: #333;
}

.task-details p {
  font-size: 14px;
  color: #666;
}

.task-actions {
  display: flex;
  justify-content: space-between;
}

.btn-delete, .btn-edit {
  background-color: #ff4d4d;
  color: white;
  padding: 10px 15px;
  border-radius: 4px;
  border: none;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-delete:hover, .btn-edit:hover {
  background-color: #ff3333;
}

.btn-edit {
  background-color: #42b983;
}

.btn-edit:hover {
  background-color: #369f6c;
}

.task-checkbox {
  margin-right: 10px;
}
</style>
