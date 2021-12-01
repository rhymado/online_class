require("dotenv").config();
const express = require("express");
const server = express();

// setup mysql
const mysql = require("mysql");
const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.UNAME,
  password: process.env.PASS,
  database: process.env.DB,
});

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

server.post("/classes", (req, res) => {
  const {
    body: { name, category_id },
  } = req;
  //   {
  //       name: "",
  //       category_id: Number
  //   }
  const sqlQuery = `INSERT INTO classes (name, category_id) VALUES ("${name}", ${category_id})`;
  db.query(sqlQuery, (err, result) => {
    if (err) return res.status(500).json({ msg: "Terjadi Error", err });
    return res.status(201).json({
      msg: "Pembuatan Berhasil",
      result: {
        name,
        category_id,
        id: result.insertId,
      },
    });
  });
});

// di url ada 2 params
// path params => bagian dinamis dari suatu url, harus didefinisikan
// endpoint = /classes/:category
// penulisan => /classes/science
// req.params = {category: science}
//
// query params => ekor url yang dinamis, namun tidak harus didefinisikan
// endpoint = /classes
// penulisan => /classes?category=art
// req.query = {category: art}

// path params
server.get("/classes/:category", (req, res) => {
  const { params } = req;
  const pathParams = params.category;
  if (pathParams !== "science" && pathParams !== "art") {
    return res.status(404).json({ msg: "Hasil Tidak Ditemukan", result: [] });
  }
  const sqlQuery = `SELECT cls.id, cls.name AS "Class", ctg.name AS "Category" 
    FROM classes cls JOIN categories ctg ON cls.category_id = ctg.id 
    WHERE ctg.name = "${pathParams}"`;
  db.query(sqlQuery, (err, result) => {
    if (err) return res.status(500).json({ msg: "Terjadi Error", err });
    return res.status(200).json({ result });
  });
});

// query params
server.get("/classes", (req, res) => {
  // /classes?name=phys
  const { query } = req;
  //   const keyword = `%${query.name == undefined ? "" : query.name}%`;
  let keyword = "%%";
  if (query.name) keyword = `%${query.name}%`;
  const sqlQuery = `SELECT * FROM classes WHERE name LIKE "${keyword}"`;
  db.query(sqlQuery, (err, result) => {
    if (err) return res.json({ msg: "Terjadi Error", err });
    return res.status(200).json({
      result,
    });
  });
});

// expressApp.method(endpoint, handler1, handler2, dst)
server.get("/", (request, response) => {
  response.redirect("welcome");
});
server.get("/welcome", (req, res) => {
  res.status(200).json({
    msg: "Maaf sesi anda sudah habis",
  });
});
server.get(
  "/getdata",
  (req, res, next) => {
    const isValid = false;
    req.customValue = 1;
    if (isValid) {
      return next();
    }
    res.json({
      msg: "nilai tidak valid",
    });
  },
  (req, res) => {
    const { customValue } = req;
    res.json({
      customValue,
    });
  }
);

// server.get("/classes", (req, res) => {
//   const sqlQuery = "SELECT * FROM classes";
//   db.query(sqlQuery, (err, result) => {
//     if (err) return res.json({ msg: "Terjadi Error", err });
//     return res.status(200).json({
//       result,
//     });
//   });
// });

// server.get("/classes/science", (req, res) => {
//   const sqlQuery =
//     'SELECT cls.id, cls.name AS "class", ctg.name AS "category" FROM classes cls JOIN categories ctg ON cls.category_id = ctg.id WHERE ctg.id = 3';
//   db.query(sqlQuery, (err, result) => {
//     if (err) return res.status(500).json({ msg: "Terjadi Error", err });
//     return res.status(200).json({ result });
//   });
// });
