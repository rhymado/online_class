const authModel = require("../models/auth");
const responseHelper = require("../helpers/sendResponse");

const register = (req, res) => {
  const { body } = req;
  authModel
    .createNewUser(body)
    .then(({ status, result }) => {
      const objResponse = {
        id: result.insertId,
        email: body.email,
        name: body.name,
      };
      responseHelper.success(res, status, objResponse);
    })
    .catch(({ status, err }) => {
      responseHelper.error(res, status, err);
    });
};

const login = (req, res) => {
  const { body } = req;
  authModel
    .signIn(body)
    .then(({ status, result }) => {
      responseHelper.success(res, status, result);
    })
    .catch(({ status, err }) => {
      responseHelper.error(res, status, err);
    });
};

module.exports = { register, login };
