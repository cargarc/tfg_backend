const express = require("express");
const router = express.Router();
const eventsController = require("../controllers/eventsController");


router.get("/", eventsController.getAllEvents);
router.post("/employee", eventsController.getEventByDni); // Cambiado a POST para enviar DNI en el body

router.get("/requestEvents", eventsController.getAllEventRequest);


module.exports = router;