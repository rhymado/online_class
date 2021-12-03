const express = require("express");

const welcomeController = require("../controllers/welcome");
const welcomeRouter = express.Router();

welcomeRouter.get("/", welcomeController.greeting);

module.exports = welcomeRouter;
