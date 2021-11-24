require("dotenv").config();
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = process.env;

module.exports = async (req, res, next) => {
  // mengambil data token
  const jwtToken = req.headers["x-sutren-token"];
  //   verivikasi jwt token
  jwt.verify(jwtToken, JWT_SECRET_KEY, function (err, decoded) {
    // validasi token
    if (err) {
      // jika token tidak valid
      res.status(498).json({
        code: 498,
        status: "UNATHORIZED",
        message: "sesi telah berakhir silahkan login kembali",
      });
    } else {
      // jika token valid
      req.uuid = decoded.uuid;
      next();
    }
  });
};
