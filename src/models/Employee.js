const pool = require("../config/db");


const Employee = {
  findByDni: async (dni) => {
    const query = "SELECT * FROM Empleado WHERE dni = ?";
    const [rows] = await pool.query(query, [dni]);
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  },
};


module.exports = Employee;
