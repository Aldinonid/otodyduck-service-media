require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

//? DATABASES ?//
const { DB_PRODUCTION, DB_LOCAL } = process.env;

mongoose.connect(DB_LOCAL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const imagesRouter = require("./src/routes/images");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/images", imagesRouter);

module.exports = app;
