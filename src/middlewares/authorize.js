const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  const token = req.header("x-access-token");
  //   console.log("[DEBUG] TOKEN", token);
  const jwtOptions = {
    issuer: process.env.ISSUER,
  };
  jwt.verify(token, process.env.SECRET_KEY, jwtOptions, (err, payload) => {
    if (err) return res.status(403).json({ err });
    const { id, name } = payload;
    req.userInfo = { id, name };
    next();
  });
  //   next();
};

module.exports = { checkToken };
