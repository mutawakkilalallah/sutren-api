const multer = require("multer");

module.exports = {
  uploadStorage: multer.diskStorage({
    destination: (req, file, cb) => {
      if (file.fieldname === "document") {
        cb(null, "upload/documents");
      } else {
        cb(null, "upload/pictures");
      }
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
    },
  }),

  uploadFilter: (req, file, cb) => {
    if (file.fieldname === "document") {
      if (file.mimetype === "application/pdf") {
        cb(null, true);
      } else {
        cb(null, false);
      }
    } else {
      if (file.mimetype === "image/png" || "image/jpg" || "image/jpeg") {
        cb(null, true);
      } else {
        cb(null, false);
      }
    }
  },
};
