const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("../config/db");

const createNewUser = (body) => {
  return new Promise((resolve, reject) => {
    // check apakah email tidak duplikat
    // body
    const sqlQuery = "INSERT INTO students SET ?";
    bcrypt
      .hash(body.password, 10)
      .then((hashedPassword) => {
        const bodyWithHashedPassword = {
          ...body,
          password: hashedPassword,
        };
        db.query(sqlQuery, [bodyWithHashedPassword], (err, result) => {
          if (err) return reject({ status: 500, err });
          resolve({ status: 201, result });
        });
      })
      .catch((err) => {
        reject({ status: 500, err });
      });
  });
};

const signIn = (body) => {
  return new Promise((resolve, reject) => {
    const { name, password } = body;
    const sqlQuery = `SELECT * FROM students WHERE ? AND ?`;
    db.query(sqlQuery, [{ name }, { password }], (err, result) => {
      if (err) return reject({ status: 500, err });
      if (result.length == 0)
        return reject({ status: 401, err: "Nama/Password Salah" });
      // result itu adalah array
      // hasil dari query ditampung di result
      // jika berhasil query diatas maka result = [{id, name, city_id, email, password}]
      const payload = {
        id: result[0].id,
        name: result[0].name,
      };
      const jwtOptions = {
        expiresIn: "5m",
        issuer: process.env.ISSUER,
      };
      jwt.sign(payload, process.env.SECRET_KEY, jwtOptions, (err, token) => {
        if (err) return reject({ status: 500, err });
        resolve({
          status: 200,
          result: {
            token,
          },
        });
      });
    });
  });
};

module.exports = { createNewUser, signIn };
