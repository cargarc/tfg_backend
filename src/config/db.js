const mysql = require("mysql2/promise"); // Usamos la versión promisificada
require("dotenv").config();

// Configuración del pool de conexiones (mejor rendimiento)
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "prueba",
  waitForConnections: true,
  connectionLimit: 10, // Número máximo de conexiones simultáneas
  queueLimit: 0,
});

// Verificar conexión al iniciar
pool
  .getConnection()
  .then((connection) => {
    console.log("Conectado a MySQL correctamente");
    connection.release();
  })
  .catch((err) => {
    console.error("Error al conectar a MySQL:", err.message);
  });

// Exportar el pool para usarlo en los modelos
module.exports = pool;
