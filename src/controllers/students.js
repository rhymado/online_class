const studentModel = require("../models/students");
const responseHelper = require("../helpers/sendResponse");

const getStudentsWithOrder = (req, res) => {
  const { query } = req;
  studentModel
    .getStudentsWithOrder(query)
    .then(({ status, result }) => {
      responseHelper.success(res, status, result);
    })
    .catch(({ status, err }) => {
      responseHelper.error(res, status, err);
    });
};

module.exports = {
  getStudentsWithOrder,
};
