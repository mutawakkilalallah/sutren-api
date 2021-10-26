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
      res.status(403).json({
        code: 401,
        status: "UNATHORIZED",
        message: "silahkan login terlebih dahulu",
      });
    } else {
      // jika token valid
      req.uuid = decoded.uuid;
      next();
    }
  });
};
