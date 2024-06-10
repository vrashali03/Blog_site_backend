const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");

const { dbConnection } = require("./config/mongo.config");

const app = express();
require("dotenv").config();

const routes = require("./controller/controller.routes");

app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:5000",
      "https://blog-site-frontend-5db6.onrender.com",
    ],
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static(__dirname + "/uploads"));

app.use("/", routes);

async function serverConnection() {
  await dbConnection();
  app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
  });
}

serverConnection();
