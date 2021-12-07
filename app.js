require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const morgan = require("morgan");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const { uploadStorage, uploadFilter } = require("./helper/multer");
const suratMasukRouter = require("./app/surat-masuk/router");
const suratKeluarRouter = require("./app/surat-keluar/router");
const userRouter = require("./app/user/router");
const documentRouter = require("./app/document/router");
const authentication = require("./middlewares/authentication");
const tujuanRouter = require("./app/tujuan/router");
const pengesahanRouter = require("./app/pengesahan/router");
const jenisRouter = require("./app/jenis/router");

// morgan
app.use(morgan("dev"));
// cors
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    exposedHeaders:
      "X-Data-Total, X-Pagination-Data-Limit, X-Pagination-Total-Page, X-Sutren-Token",
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
app.use("/api/surat-masuk", authentication, suratMasukRouter);
// routing surat keluar
app.use("/api/surat-keluar", authentication, suratKeluarRouter);
// routing user
app.use("/api/user", userRouter);
// routing document
app.use("/api/document", authentication, documentRouter);
// routing tujuan
app.use("/api/surat-tujuan", authentication, tujuanRouter);
// routing pengesahan
app.use("/api/surat-pengesahan", authentication, pengesahanRouter);
// routing jenis
app.use("/api/surat-jenis", authentication, jenisRouter);

app.listen(port, console.log("server running on port " + port));
