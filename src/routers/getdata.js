const express = require("express");

const getDataController = require("../controllers/getdata");
const getDataRouter = express.Router();

getDataRouter.get("/", getDataController.testMiddleware);

module.exports = getDataRouter;
