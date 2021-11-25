const { user } = require("../models");

module.exports = {
  sysadmin: async (req, res, next) => {
    // cek role user
    if (req.akses === "sysadmin") {
      // jika sysadmin lanjutkan
      req.uuid;
      next();
    } else {
      // jika bukan sysadmin tolak akses
      res.status(403).json({
        code: 403,
        status: "FORBIDDEN",
        message: "tidak ada akses",
      });
    }
  },
  admin: async (req, res, next) => {
    // cek role user
    if (req.akses === "admin" || req.akses === "sysadmin") {
      // jika admin lanjutkan
      req.uuid;
      next();
    } else {
      // jika bukan admin tolak akses
      res.status(403).json({
        code: 403,
        status: "FORBIDDEN",
        message: "tidak ada akses",
      });
    }
  },
};
