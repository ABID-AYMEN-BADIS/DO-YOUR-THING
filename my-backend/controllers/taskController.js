const db = require('../models/db');

exports.index = (req, res) => {
  const userId = req.user.id;
  const query = 'SELECT * FROM tasks WHERE user_id = ?';
  db.query(query, [userId], (err, results) => {
    if (err) return res.status(500).json({ message: 'Erreur lors de la récupération des tâches' });
    res.json({ tasks: results });
  });
};
exports.show = (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const query = 'SELECT * FROM tasks WHERE id = ? AND user_id = ?';
  db.query(query, [id, userId], (err, results) => {
    if (err) return res.status(500).json({ message: 'Erreur serveur' });
    if (results.length === 0) return res.status(404).json({ message: 'Tâche non trouvée' });
    res.json(results[0]);
  });
};

exports.store = (req, res) => {
  const userId = req.user.id;
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: 'Le titre et la description sont requis' });
  }

  const query = 'INSERT INTO tasks (user_id, title, description, completed) VALUES (?, ?, ?, false)';
  db.query(query, [userId, title, description], (err, results) => {
    if (err) return res.status(500).json({ message: 'Erreur lors de l\'ajout de la tâche' });
    const newTask = { id: results.insertId, user_id: userId, title, description, completed: false };
    res.status(201).json(newTask);
  });
};

exports.update = (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  const query = 'UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ? AND user_id = ?';
  db.query(query, [title, description, completed, id, req.user.id], (err) => {
    if (err) return res.status(500).json({ message: 'Erreur lors de la mise à jour de la tâche' });
    res.json({ id, title, description, completed });
  });
};

exports.destroy = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM tasks WHERE id = ? AND user_id = ?';
  db.query(query, [id, req.user.id], (err) => {
    if (err) return res.status(500).json({ message: 'Erreur lors de la suppression de la tâche' });
    res.json({ message: 'Tâche supprimée', id });
  });
};
exports.markComplete = (req, res) => {
  console.log("markComplete appelé pour id:", req.params.id);
  const { id } = req.params;
  const userId = req.user.id;

  const query = 'UPDATE tasks SET completed = true WHERE id = ? AND user_id = ?';
  db.query(query, [id, userId], (err, results) => {
    if (err) return res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'état de la tâche' });
    if (results.affectedRows === 0) return res.status(404).json({ message: 'Tâche non trouvée ou non autorisée' });
    res.json({ message: 'Tâche marquée comme terminée', id });
  });
};
