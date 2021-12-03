const greeting = (req, res) => {
  res.status(200).json({
    msg: "Maaf sesi anda sudah habis",
  });
};

module.exports = {
  greeting,
};
