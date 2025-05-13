const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticate = require('../middleware/authenticate');

// Route pour l'inscription
router.post('/register', authController.register);
// Route pour la connexion
router.post('/login', authController.login);
// Route pour la mise à jour du mot de passe
router.put('/password', authenticate, authController.changePassword);
// Route pour la suppression du compte
router.delete('/account', authenticate, authController.deleteAccount);

module.exports = router;
