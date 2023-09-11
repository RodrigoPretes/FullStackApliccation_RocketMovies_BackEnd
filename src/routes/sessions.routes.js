const { Router } = require("express");

const SessionsController = require("../Controllers/SessionsController");
const sessionsController = new SessionsController();

const sessionRoutes = Router();
sessionRoutes.post("/", sessionsController.create);

module.exports = sessionRoutes;