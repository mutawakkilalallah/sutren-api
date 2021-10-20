const multer = require("multer");

module.exports = {
  documentStorage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "upload/documents");
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, "document-" + uniqueSuffix + ".pdf");
    },
  }),

  documentFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },

  // pictureStorage: multer.diskStorage({
  //   destination: (req, file, cb) => {
  //     cb(null, "upload/pictures");
  //   },
  //   filename: (req, file, cb) => {
  //     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  //     cb(null, "picture-" + uniqueSuffix);
  //   },
  // }),

  // pictureFilter: (req, file, cb) => {
  //   if (file.mimetype === "image/png" || "image/jpg" || "image/jpeg") {
  //     cb(null, true);
  //   } else {
  //     cb(null, false);
  //   }
  // },
};
