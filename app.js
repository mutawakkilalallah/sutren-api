const express = require("express");
const app = express();
const port = 3000;
const morgan = require("morgan");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const { uploadStorage, uploadFilter } = require("./helper/multer");
const suratRouter = require("./app/surat-masuk/router");
const userRouter = require("./app/user/router");
const authentication = require("./middlewares/authentication");

// morgan
app.use(morgan("dev"));
// cors
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    exposedHeaders:
      "X-Data-Total, X-Pagination-Data-Limit, X-Pagination-Total-Page",
  })
);
// public directory
app.use("/upload", express.static(path.join(__dirname, "upload")));
// konfigurasi body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// multer
app.use(
  multer({ storage: uploadStorage, fileFilter: uploadFilter }).fields([
    { name: "document", maxCount: 1 },
    { name: "picture", maxCount: 1 },
  ])
);

// routing surat masuk
app.use("/api/surat-masuk/", authentication, suratRouter);
// routing user
app.use("/api/user/", userRouter);

app.listen(port);
