const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./routers/index.routes");
const errorHandler = require("./middlewares/error.handler");

require("dotenv").config({ path: "./.env.development" });

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.PORT || 5000,
    credentials: true,
  })
);
require("./configs/mongo")();
app.use("/api/v1", router);
app.use(errorHandler.handler);

app.listen(process.env.PORT || 5000, function () {
  console.log("Server listening on", process.env.PORT);
});
