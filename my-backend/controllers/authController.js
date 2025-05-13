const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models/db');

function isPasswordStrong(password) {
  const regex = /^(?=.*[!@#$%^&*])(?=.*\d)(?=.{8,})/;
  return regex.test(password);
}
function isValidEmail(email){
const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

exports.register = (req, res) => {
  const { email, password ,confirmedpassword} = req.body;

  if(password!==confirmedpassword){
return res.status(404).json({ message: "veuillez confirmer votre mot de passe s'il vous plaît" });
  }

  if (!email || !password) {
    return res.status(400).json({ message: 'Email et mot de passe sont requis' });
  }
  if(!isValidEmail){
    return res.status(400).json({message:"veuillez entrez un email valide s'il vous plait!"})
  }

  if (!isPasswordStrong(password)) {
    return res.status(400).json({ message: 'Mot de passe trop faible (min 8 caractères, 1 spécial, 1 chiffre)' });
  }

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ message: 'Erreur lors du hachage du mot de passe' });

    const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
    db.query(query, [email, hashedPassword], (err, results) => {
      if (err) return res.status(500).json({ message: 'Erreur lors de l\'inscription' });

      const userId = results.insertId;
      const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(201).json({ token });
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email et mot de passe sont requis' });
  }

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) return res.status(500).json({ message: 'Erreur lors de la connexion' });
    if (results.length === 0) return res.status(400).json({ message: 'Utilisateur non trouvé' });

    const user = results[0];

    bcrypt.compare(password, user.password, (err, match) => {
      if (err) return res.status(500).json({ message: 'Erreur lors de la vérification du mot de passe' });
      if (!match) return res.status(400).json({ message: 'Mot de passe incorrect' });

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    });
  });
};

exports.changePassword = (req, res) => {
  const userId = req.user.id;
  const { newPassword } = req.body;

  if (!newPassword || !isPasswordStrong(newPassword)) {
    return res.status(400).json({ message: 'Mot de passe trop faible (min 8 caractères, 1 spécial, 1 chiffre)' });
  }

  bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ message: 'Erreur lors du hachage du mot de passe' });

    const query = 'UPDATE users SET password = ? WHERE id = ?';
    db.query(query, [hashedPassword, userId], (err) => {
      if (err) return res.status(500).json({ message: 'Erreur lors de la mise à jour du mot de passe' });
      res.json({ message: 'Mot de passe mis à jour' });
    });
  });
};

exports.deleteAccount = (req, res) => {
  const userId = req.user.id;
  const query = 'DELETE FROM users WHERE id = ?';
  db.query(query, [userId], (err) => {
    if (err) return res.status(500).json({ message: 'Erreur lors de la suppression du compte' });
    res.json({ message: 'Compte supprimé' });
  });
};
