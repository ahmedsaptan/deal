const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const rid = require("connect-rid");
const cors = require("cors");

require("dotenv").config();
require("./models");

const indexRouter = require("./routes/index");

const app = express();
app.use(logger("tiny"));
app.use(express.json());
app.use(helmet());
app.use(compression());
app.use(
  rid({
    headerName: "X-RID",
  })
);
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.log(err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err,
  });
});

module.exports = app;
