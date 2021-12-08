const mysql = require("mysql");
const db = require("../config/db");

const getStudentsWithOrder = (query) => {
  return new Promise((resolve, reject) => {
    let sqlQuery = `SELECT u.name AS "fullname", c.name AS "city"
      FROM users u
      JOIN cities c ON u.city_id = c.id`;
    const statement = [];

    // student => s.name
    // city => c.name
    const order = query.order;
    let orderBy = "";
    if (query.by && query.by.toLowerCase() == "student") orderBy = "u.name";
    if (query.by && query.by.toLowerCase() == "city") orderBy = "c.name";
    if (query.by && query.by.toLowerCase() == "id") orderBy = "u.id";
    if (order && orderBy) {
      sqlQuery += " ORDER BY ? ?";
      statement.push(mysql.raw(orderBy), mysql.raw(order));
    }
    // yang butuh mysql.raw
    // input yang merupakan syntax sql

    // ambil total data
    const countQuery = `select count(*) as "count" from users`;
    // let count
    db.query(countQuery, (err, result) => {
      if (err) return reject({ status: 500, err });

      // Paginasi
      // LIMIT  5
      // OFFSET 0 5 10 15 dst
      // PAGE   1 2 3  4  dst
      // rumus untuk offset = (page - 1) * limit
      const page = parseInt(query.page);
      const limit = parseInt(query.limit);
      const count = result[0].count;
      if (query.page && query.limit) {
        sqlQuery += " LIMIT ? OFFSET ?";
        const offset = (page - 1) * limit;
        statement.push(limit, offset);
      }

      const meta = {
        next:
          page == Math.ceil(count / limit)
            ? null
            : `/students?by=id&order=asc&page=${page + 1}&limit=3`,
        prev:
          page == 1
            ? null
            : `/students?by=id&order=asc&page=${page - 1}&limit=3`,
        count,
      };
      db.query(sqlQuery, statement, (err, result) => {
        if (err) return reject({ status: 500, err });
        return resolve({ status: 200, result: { data: result, meta } });
      });
    });
  });
};

const getStudentsPaginated = async (query) => {
  let sqlQuery = `SELECT u.name AS "fullname", c.name AS "city"
      FROM users u
      JOIN cities c ON u.city_id = c.id`;
  const statement = [];

  // student => s.name
  // city => c.name
  const order = query.order;
  let orderBy = "";
  if (query.by && query.by.toLowerCase() == "student") orderBy = "u.name";
  if (query.by && query.by.toLowerCase() == "city") orderBy = "c.name";
  if (query.by && query.by.toLowerCase() == "id") orderBy = "u.id";
  if (order && orderBy) {
    sqlQuery += " ORDER BY ? ?";
    statement.push(mysql.raw(orderBy), mysql.raw(order));
  }
  // yang butuh mysql.raw
  // input yang merupakan syntax sql

  // Paginasi
  // LIMIT  5
  // OFFSET 0 5 10 15 dst
  // PAGE   1 2 3  4  dst
  // rumus untuk offset = (page - 1) * limit
  if (query.page && query.limit) {
    sqlQuery += " LIMIT ? OFFSET ?";
    const page = parseInt(query.page);
    const limit = parseInt(query.limit);
    const offset = (page - 1) * limit;
    statement.push(limit, offset);
  }

  // let count
  try {
    // ambil total data
    const countQuery = `select count(*) as "count" from users`;
    const result = await db.query(countQuery);
    const meta = {
      next: "/students?by=id&order=asc&page=3&limit=3",
      prev: "/students?by=id&order=asc&page=1&limit=3",
      count: result[0].count,
    };
    const data = await db.query(sqlQuery, statement);
    return { status: 200, result: { data, meta } };
  } catch (err) {
    return { status: 500, err };
  }
};

module.exports = { getStudentsWithOrder, getStudentsPaginated };
