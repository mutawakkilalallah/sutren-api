require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const morgan = require("morgan");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { test } = require("./models");

const { uploadStorage, uploadFilter } = require("./helper/multer");
const suratMasukRouter = require("./app/surat-masuk/router");
const suratKeluarRouter = require("./app/surat-keluar/router");
const userRouter = require("./app/user/router");
const authentication = require("./middlewares/authentication");
const tujuanRouter = require("./app/tujuan/router");
const pengesahanRouter = require("./app/pengesahan/router");

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
    { name: "document", maxCount: 5 },
    { name: "picture", maxCount: 1 },
  ])
);

// routing surat masuk
app.use("/api/surat-masuk/", authentication, suratMasukRouter);
// routing surat keluar
app.use("/api/surat-keluar/", authentication, suratKeluarRouter);
// routing user
app.use("/api/user/", userRouter);
// routing tujuan
app.use("/api/surat-tujuan", authentication, tujuanRouter);
// routing pengesahan
app.use("/api/surat-pengesahan", authentication, pengesahanRouter);

// testing
app.post("/api/test", async (req, res) => {
  const jumlah = parseInt(req.body.jumlah);
  for (let i = 0; i < jumlah; i++) {
    const data = await test.create({
      nama: "Test Ke " + i,
    });
    res.json({
      message: "Test Selesai yang ke " + data.id,
    });
  }
});
app.get("/api/test", async (req, res) => {
  const limit = parseInt(req.query.limit);
  const data = await test.findAndCountAll({
    limit,
  });
  res.json({
    message: "Berhasil get data dengan jumlah " + data.count,
  });
});

app.listen(port, console.log("server running on port " + port));
