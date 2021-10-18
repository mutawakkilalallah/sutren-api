module.exports = {
  // menambahkan user baru
  create: async (req, res) => {
    res.status(200).json({
      message: "Halaman tambah user",
    });
  },
};
