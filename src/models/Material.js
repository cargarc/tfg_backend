const pool = require("../config/db");


const Material = {
  findAllMaterial: async () => {
    const [rows] = await pool.query("SELECT * FROM MaterialPropio");
    return rows;
  },


  createRental: async (materialRental) => {
    const [result] = await pool.query(
      "INSERT INTO MaterialEnAlquiler (descripcion , cantidad , precio, estado) VALUES (?, ?, ?, ?)",
      [materialRental.descripcion, materialRental.cantidad, materialRental.precio, materialRental.estado]
    );
    return { id: result.insertId, ...materialRental };
    },
 
  createMaterialEvent: async (materialEvent) => {
    const [result] = await pool.query(
      "INSERT INTO MaterialEnEvento (nombre , descripcion, precio, codEvento) VALUES (?, ?, ?, ?)",
      [materialEvent.nombre, materialEvent.descripcion, materialEvent.precio, materialEvent.codEvento]
    );
    return { id: result.insertId, ...materialEvent };
  }
};


module.exports = Material;
