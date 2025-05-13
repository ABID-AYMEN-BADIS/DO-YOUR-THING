require('dotenv').config({ path: './config/.env' });
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Ajout du package CORS
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const port = 5000;

// Autoriser toutes les origines (à affiner si nécessaire)
app.use(cors());

// Middleware pour traiter les données JSON
app.use(bodyParser.json());

// Routes pour l'authentification et les tâches
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
