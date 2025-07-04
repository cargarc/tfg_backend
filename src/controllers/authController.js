const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authController = {
  // Login
  login: async (req, res) => {
    try {
      const { email, contraseña} = req.body;
      console.log("email recibida:", email); // 👈 Nuevo
      console.log("Contraseña recibida:", contraseña); // 👈 Nuevo
      const user = await User.findByEmail(email);

      if (!user) {
        return res.status(401).json({ error: "Usuario no encontrado" });
      }

      // Verificar contraseña
      const validPassword = await bcrypt.compare(contraseña, user.contraseña);
      if (!validPassword) {
        return res.status(401).json({ error: "Contraseña incorrecta" });
      }

      // Generar token JWT (válido por 1 hora)
      // const token = jwt.sign(
      //   { id: user.id, email: user.email },
      //   process.env.JWT_SECRET,
      //   { expiresIn: "1h" }
      // );

      res.json({ user: { dni: user.dni, contadorHoras: user.contadorHoras, estado: user.estado, salario: user.salario} });
    } catch (error) {
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  // Registro
  register: async (req, res) => {
    try {
      const { email, password, name } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const userId = await User.create({
        email,
        password: hashedPassword,
        name,
      });
      res.status(201).json({ id: userId, message: "Usuario registrado" });
    } catch (error) {
      res.status(500).json({ error: "Error al registrar usuario" });
    }
  },
};

module.exports = authController;
