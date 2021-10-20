const express = require("express");
const app = express();
const port = 3000;
const morgan = require("morgan");
const bodyParser = require("body-parser");
const multer = require("multer");

const { documentStorage, documentFilter } = require("./helper/multer");
const suratRouter = require("./app/surat-masuk/router");
const userRouter = require("./app/user/router");

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
