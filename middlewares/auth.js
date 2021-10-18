require("dotenv").config();
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = process.env;

module.exports = async (req, res, next) => {
  // mengambil data token
  jwtToken = req.headers.authorization;
  //   verivikasi jwt token
  jwt.verify(jwtToken, JWT_SECRET_KEY, function (err, decoded) {
    // validasi token
    if (err) {
      // jika token tidak valid
      res.status(403).json({
        code: 403,
        status: "FORBIDDEN",
        message: "invalid token",
      });
    } else {
      // jika token valid
      req.uuid = decoded.uuid;
      next();
    }
  });
};
