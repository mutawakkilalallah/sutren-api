const { Op } = require("sequelize");
const { tujuan } = require("../../models");

module.exports = {
  // get all tujuan
  index: async (req, res) => {
    try {
      // jika berhasil

      // mengambil parameter
      const search = req.query.cari || "";
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const offset = 0 + (page - 1) * limit;

      // mengambil data ke database
      const data = await tujuan.findAndCountAll({
        where: {
          nama: {
            [Op.like]: "%" + search + "%",
          },
        },
        limit: limit,
        offset: offset,
      });

      res.json(data.rows);
    } catch (err) {
      // jika gagal

      // response error
      res.status(500).json({
        statusCode: 500,
        err: err.message,
        message: "Internal Server Error",
      });
    }
  },
};
