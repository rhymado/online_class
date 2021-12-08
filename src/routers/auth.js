const express = require("express");

const authRouter = express.Router();
const authController = require("../controllers/auth");
const validate = require("../middlewares/validate");

// /auth
authRouter.post("/", authController.login); // login
authRouter.post("/new", validate.register, authController.register); // register
authRouter.delete("/"); // logout

module.exports = authRouter;
