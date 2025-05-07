const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/', taskController.index);            // Récupérer toutes les tâches
router.post('/', taskController.store);           // Ajouter une tâche
router.put('/:id', taskController.update);       // Mettre à jour une tâche
router.delete('/:id', taskController.destroy);   // Supprimer une tâche

module.exports = router;
