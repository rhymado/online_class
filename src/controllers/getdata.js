const testMiddleware = (req, res) => {
  const { customValue } = req;
  res.json({
    customValue,
  });
};

module.exports = {
  testMiddleware,
};
