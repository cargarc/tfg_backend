const Event = require("../models/Event");
const RequestEvent = require("../models/RequestEvent");


const eventsController = {
 getAllEvents: async (req, res) => {
    try {
      const events = await Event.findAll();
      res.json({
        status: true,
        data: events,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },


  getEventByDni: async (req, res) => {
    console.log("Llego aqui -getEventByDni");
    console.log("Body:", req.body); // Verifica el contenido del body
    try {
      const dni = req.body.dni; // <- Aquí lo lees desde el body
      if (!dni) {
        return res
          .status(400)
          .json({ status: false, message: "DNI is required" });
      }


      const events = await Event.findByDni(dni);
      if (!events) {
        return res
          .status(404)
          .json({ status: false, message: "Events not found" });
      }


      res.json({
        status: true,
        data: events,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAllEventRequest: async (_, res) => {
    try {
      const events = await RequestEvent.findAll();
      res.json({
        status: true,
        data: events,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },


};


module.exports = eventsController;
