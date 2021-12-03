const express = require("express");
const mainRouter = express.Router();

const classRouter = require("./classes");
const studentRouter = require("./students");
const welcomeRouter = require("./welcome");
const getDataRouter = require("./getdata");

const attachValueMiddleware = require("../middlewares/attachValue");
// mainRouter akan dijadikan sebagai HUB utama
// semua request akan masuk melalui mainRouter
// nanti mainRouter akan membagi ke masing masing subRouternya
// banyaknya subRouter ditentukan dengan banyaknya jenis endpoint

mainRouter.use("/classes", classRouter); // /classes
mainRouter.use("/students", studentRouter); // /students
mainRouter.use("/welcome", welcomeRouter); // /welcome
mainRouter.use("/getdata", attachValueMiddleware, getDataRouter); // /getdata

// expressApp.method(endpoint, handler1, handler2, dst)
mainRouter.get("/", (request, response) => {
  response.redirect("welcome");
});

module.exports = mainRouter;
