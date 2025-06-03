const Task = require("../models/Task");

const tasksController = {
  getAllTasks: async (req, res) => {
    try {
      const tasks = await Task.findAll(req.user.id);
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createTask: async (req, res) => {
    try {
      const task = await Task.create({
        title: req.body.title,
        description: req.body.description,
        user_id: req.user.id,
      });
      res.status(201).json(task);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateTask: async (req, res) => {
    // <- ¡Nuevo método!
    try {
      const updated = await Task.update(req.params.id, req.body);
      res.json(updated);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteTask: async (req, res) => {
    // <- ¡Nuevo método!
    try {
      await Task.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = tasksController;
