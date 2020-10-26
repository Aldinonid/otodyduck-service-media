require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

//? DATABASES ?//
mongoose.connect(`mongodb+srv://aldinonid:${process.env.DB_PASSWORD}@otodyduck-cluster.wmasw.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {
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