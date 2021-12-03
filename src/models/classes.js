const db = require("../config/db");

const getClassById = (classId) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT cls.id, cls.name AS "class", ctg.name AS "category" 
        FROM classes cls JOIN categories ctg ON cls.category_id = ctg.id 
        WHERE cls.id = ${classId}`;
    db.query(sqlQuery, (err, result) => {
      if (err) return reject({ status: 500, err });
      // console.log(result.length);
      if (result.length == 0) return resolve({ status: 404, result });
      resolve({ status: 200, result });
    });
  });
};

const getClassByNameAndCategory = (keyword, categoryId) => {
  return new Promise((resolve, reject) => {
    const selectQuery = `SELECT * FROM classes`;
    const searchQuery = ` WHERE name LIKE ?`;
    const filterQuery = ` AND category_id = ?`;
    const sqlQuery = selectQuery + searchQuery + filterQuery;
    db.query(sqlQuery, [keyword, categoryId], (err, result) => {
      if (err) return reject({ status: 500, err });
      if (result.length == 0) return resolve({ status: 404, result });
      resolve({ status: 200, result });
    });
  });
};

const postNewClass = (body) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `INSERT INTO classes SET ?`;
    db.query(sqlQuery, body, (err, result) => {
      if (err) return reject({ status: 500, err });
      resolve({ status: 201, result });
    });
  });
};

module.exports = {
  getClassById,
  getClassByNameAndCategory,
  postNewClass,
};
