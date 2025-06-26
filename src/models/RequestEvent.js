const pool = require("../config/db");


const RequestEvent = {
  findAll: async () => {
    const [rows] = await pool.query("SELECT * FROM SolicitudEvento");
    return rows;
  },


  create: async (data) => {
    const { usuario_id, evento_id, estado } = data;
    const [result] = await pool.query(
      "INSERT INTO SolicitudEvento (usuario_id, evento_id, estado) VALUES (?, ?, ?)",
      [usuario_id, evento_id, estado]
    );
    return result.insertId;
  },
};


module.exports = RequestEvent;
