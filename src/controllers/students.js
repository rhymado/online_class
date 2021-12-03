const mysql = require("mysql");
const db = require("../config/db");

const getStudentsWithOrder = (req, res) => {
  const { query } = req;
  let sqlQuery = `SELECT s.name AS "fullname", c.name AS "city"
      FROM students s
      JOIN cities c ON s.city_id = c.id`;
  const statement = [];
  // student => s.name
  // city => c.name
  const order = query.order;
  let orderBy = "";
  if (query.by && query.by.toLowerCase() == "student") orderBy = "s.name";
  if (query.by && query.by.toLowerCase() == "city") orderBy = "c.name";
  if (order && orderBy) {
    sqlQuery += " ORDER BY ? ?";
    statement.push(mysql.raw(orderBy), mysql.raw(order));
  }
  // yang butuh mysql.raw
  // input yang merupakan syntax sql
  db.query(sqlQuery, statement, (err, result) => {
    if (err) return res.status(500).json({ msg: "Terjadi Error", err });
    return res.status(200).json({ result });
  });
};

module.exports = {
  getStudentsWithOrder,
};
