const classModel = require("../models/classes");
const responseHelper = require("../helpers/sendResponse");

const getClassById = (req, res) => {
  const { params } = req;
  const classId = params.id;
  // if (pathParams !== "science" && pathParams !== "art") {
  //   return res.status(404).json({ msg: "Hasil Tidak Ditemukan", result: [] });
  // }
  classModel
    .getClassById(classId)
    .then(({ status, result }) => {
      if (status == 404)
        return res
          .status(status)
          .json({ msg: "Kelas Tidak Ditemukan", result });
      res.status(status).json({ result });
    })
    .catch(({ status, err }) => {
      res.status(status).json({ msg: "Terjadi Error", err });
    });
  // try {
  //   const { status, result } = await classModel.getClassById(classId);
  //   if (status === 404)
  //     return res.status(status).json({ msg: "Kelas Tidak Ditemukan", result });
  //   return res.status(status).json({ result });
  // } catch (error) {
  //   const { status, err } = error;
  //   if (status) return res.status(status).json({ msg: "Terjadi Error", err });
  //   return res.status(500).json({ err: error });
  // }
};

const getClassByNameAndCategory = (req, res) => {
  // /classes?name=phys
  const { query } = req;
  //   const keyword = `%${query.name == undefined ? "" : query.name}%`;
  let keyword = "%%";
  if (query.name) keyword = `%${query.name}%`;
  classModel
    .getClassByNameAndCategory(keyword, query.category_id)
    .then(({ status, result }) => {
      if (status == 404)
        return responseHelper.success(res, status, {
          msg: "Kelas Tidak Ditemukan",
          result,
        });
      responseHelper.success(res, status, { msg: "OK", result });
    })
    .catch((status, err) => {
      responseHelper.error(res, status, { msg: "Terjadi Error", err });
    });
};

const postNewClass = (req, res) => {
  const { body } = req;
  //   {
  //       name: "",
  //       category_id: Number
  //   }
  // name = "", category_id = 0
  classModel
    .postNewClass(body)
    .then(({ status, result }) => {
      res.status(status).json({
        msg: "Pembuatan Berhasil",
        result: {
          ...body,
          id: result.insertId,
        },
      });
    })
    .catch((status, err) => {
      res.status(status).json({ msg: "Terjadi Error", err });
    });
};

module.exports = {
  getClassById,
  getClassByNameAndCategory,
  postNewClass,
};
