const responseHelper = require("../helpers/sendResponse");

const register = (req, res, next) => {
  // validasi body
  const { body } = req;
  const registerBody = ["name", "city_id", "email", "password"];
  const bodyProperty = Object.keys(body);
  const isBodyValid =
    registerBody.filter((property) => !bodyProperty.includes(property))
      .length == 0
      ? true
      : false;
  console.log(isBodyValid);
  if (!isBodyValid) return responseHelper.error(res, 400, "Invalid Body");
  next();
};

// const checkDuplicateEmail = (req, res, next) => {
//   // cek apakah email duplikat dengan query
//   // jika sudah terdaftar maka response error
//   // jika belum maka next
// };

module.exports = { register };
