require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mainRouter = require("./src/routers/main");

const server = express();
const logger = morgan(
  ":method :url :status :res[content-length] - :response-time ms"
);

const port = 8000;
server.listen(port, () => {
  console.log(`Server sudah berjalan di port ${port}`);
});

// with body/payload
// req.body
// parser => middleware yang membaca body
// urlencoded
// express.urlencoded()
// raw json
// express.json()
// middleware global
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(logger);
server.use(mainRouter);
