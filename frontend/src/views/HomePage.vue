<template>
  <div class="homePage">
    <div class="task-list">
      <h1>Bienvenue à notre Application de gestion de Tâches</h1>
      <p>Powered by ABID AYMEN BADIS et BENZAKOUR ABDELLATIF</p>
      
      <div class="buttons">
        <router-link to="/login" class="btn-link">Login</router-link>
        <router-link to="/register" class="btn-link">S'inscrire</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
};
</script>

<style scoped>
.homePage {
  padding: 2rem;
  background-color: #f4f6f9;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}

h1 {
  font-size: 32px;
  font-weight: bold;
  color: #333;
  text-align: center;
}

p {
  font-size: 16px;
  color: #666;
  text-align: center;
}

.buttons {
  margin-top: 2rem;
  display: flex;
  gap: 20px;
}

.btn-link {
  padding: 12px 20px;
  background-color: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-size: 16px;
  text-align: center;
  display: inline-block;
  transition: background-color 0.3s;
}

.btn-link:hover {
  background-color: #369f6c;
}
</style>
