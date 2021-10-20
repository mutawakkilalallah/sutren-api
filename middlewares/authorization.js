const { User } = require("../models");

module.exports = async (req, res, next) => {
  // mengambil data user
  const user = await User.findOne({
    where: {
      uuid: req.uuid,
    },
  });
  // // cek role user
  // if (user.akses != "admin") {
  //   // jika bukan admin tolak akses
  //   res.status(403).json({
  //     code: 403,
  //     status: "FORBIDDEN",
  //     message: "tidak ada akses",
  //   });
  // }
  // jika admin lanjutkan
  req.uuid, next();
};
