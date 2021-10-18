const express = require("express");
const app = express();
const port = 3000;
const morgan = require("morgan");
const bodyParser = require("body-parser");
const multer = require("multer");

const suratRouter = require("./app/surat-masuk/router");
const userRouter = require("./app/user/router");

// konfigurasi multer
const documentStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload/documents");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".pdf");
  },
});

const documentFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// morgan
app.use(morgan("dev"));
// public directory
app.use(express.static("upload"));
// konfigurasi body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// multer
app.use(
  multer({ storage: documentStorage, fileFilter: documentFilter }).single(
    "document"
  )
);

// routing surat masuk
app.use("/api/surat-masuk/", suratRouter);
// routing user
app.use("/api/user/", userRouter);

app.listen(port);
