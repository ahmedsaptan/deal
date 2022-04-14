const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const rid = require("connect-rid");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

require("dotenv").config();
require("./models");

const indexRouter = require("./routes/index");

const app = express();
app.use(logger("combined"));
app.use(express.json());
app.use(helmet());
app.use(compression());
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send({
    message: "hello world",
  });
});
app.use("/api", indexRouter);

const ROOT_URL =
  process.env == "production"
    ? "https://saptan-deal.herokuapp.com"
    : "http://localhost:3000";
console.table({
  ROOT_URL,
});
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "deal app task Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
    },
    servers: [
      {
        url: `${ROOT_URL}/api/`,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
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
