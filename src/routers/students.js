const express = require("express");

const studentController = require("../controllers/students");

const studentRouter = express.Router();

studentRouter.get("/", studentController.getStudentsWithOrder);

module.exports = studentRouter;
