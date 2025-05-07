const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const taskRoutes = require('./routes/taskRoutes');

// Charger les variables d'environnement
dotenv.config();

const app = express();

// Middleware
const corsOptions = {
  origin: 'http://localhost:5173', // Remplace par l'URL du frontend
  methods: 'GET,POST,PUT,DELETE',
};
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/tasks', taskRoutes);

// Démarrer le serveur
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
