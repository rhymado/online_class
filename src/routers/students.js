const express = require("express");

const studentController = require("../controllers/students");

const db = require("../config/db");

const studentRouter = express.Router();

studentRouter.get("/", studentController.getStudentsWithOrder);

studentRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM users WHERE ?", [{ id }], (err, result) => {
    if (err) return res.status(500).json({ err });
    res.status(200).json({ result });
  });
});

module.exports = studentRouter;
