const pool = require("../config/db");

const Task = {
  findAll: async (userId) => {
    const [rows] = await pool.query("SELECT * FROM tasks WHERE user_id = ?", [
      userId,
    ]);
    return rows;
  },

  create: async (taskData) => {
    const [result] = await pool.query(
      "INSERT INTO tasks (title, description, user_id) VALUES (?, ?, ?)",
      [taskData.title, taskData.description, taskData.user_id]
    );
    return { id: result.insertId, ...taskData };
  },

  update: async (id, taskData) => {
    // <- ¡Nuevo método!
    const [result] = await pool.query(
      "UPDATE tasks SET title = ?, description = ? WHERE id = ?",
      [taskData.title, taskData.description, id]
    );
    return result.affectedRows > 0 ? { id, ...taskData } : null;
  },

  delete: async (id) => {
    // <- ¡Nuevo método!
    const [result] = await pool.query("DELETE FROM tasks WHERE id = ?", [id]);
    return result.affectedRows > 0;
  },
};

module.exports = Task;
