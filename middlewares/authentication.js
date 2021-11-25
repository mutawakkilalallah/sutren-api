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
      res.status(401).json({
        code: 401,
        status: "UNATHORIZED",
        message:
          "token tidak valid atau sudah kadaluarsa, silahkan login kembali",
      });
    } else {
      // jika token valid
      req.uuid = decoded.uuid;
      req.akses = decoded.akses;
      next();
    }
  });
};
