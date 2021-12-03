const express = require("express");

const classController = require("../controllers/classes");

const classRouter = express.Router();

// /classes

// di url ada 2 params
// path params => bagian dinamis dari suatu url, harus didefinisikan
// endpoint = /classes/:id
// penulisan => /classes/1
// req.params = {id: 1}
//
// query params => ekor url yang dinamis, namun tidak harus didefinisikan
// endpoint = /classes
// penulisan => /classes?category=art
// req.query = {category: art}

// path params
// /classes/:id
classRouter.get("/:id", classController.getClassById);

// query params
// /classes/
classRouter.get("/", classController.getClassByNameAndCategory);

// /classes/
classRouter.post("/", classController.postNewClass);

module.exports = classRouter;
