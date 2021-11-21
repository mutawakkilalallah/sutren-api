const { user } = require("../models");

module.exports = {
  sysadmin: async (req, res, next) => {
    // mengambil data user
    const User = await user.findOne({
      where: {
        uuid: req.uuid,
      },
    });
    // cek role user
    if (User.akses === "System Administrator") {
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
    // mengambil data user
    const User = await user.findOne({
      where: {
        uuid: req.uuid,
      },
    });
    // cek role user
    if (User.akses === "Admin" || User.akses === "System Administrator") {
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
