let tasks = []; // Exemple de tâches en mémoire

exports.index = (req, res) => {
  res.json({ tasks });
};

exports.store = (req, res) => {
  const { title, description } = req.body;
  const newTask = {
    id: Date.now().toString(),
    title,
    description,
    completed: false,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
};

exports.update = (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).json({ message: 'Task not found' });

  task.title = title || task.title;
  task.description = description || task.description;
  task.completed = completed !== undefined ? completed : task.completed;

  res.json(task);
};

exports.destroy = (req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex(t => t.id === id);

  if (taskIndex === -1) return res.status(404).json({ message: 'Task not found' });

  tasks.splice(taskIndex, 1);
  res.json({ message: 'Task deleted', id });
};
