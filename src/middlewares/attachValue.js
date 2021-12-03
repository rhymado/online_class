const attachValue = (req, res, next) => {
  const isValid = false;
  req.customValue = 1;
  if (isValid) {
    return next();
  }
  res.json({
    msg: "nilai tidak valid",
  });
};

module.exports = attachValue;
