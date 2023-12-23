const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");

const { dbConnection } = require("./config/mongo.config");

const app = express();

const routes = require("./controller/controller.routes");

app.use(
  cors({
    credentials: true,
    origin: "https://gregarious-sherbet-652f35.netlify.app",
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static(__dirname + "/uploads"));

app.use("/", routes);

async function serverConnection() {
  await dbConnection();
  app.listen(4000, () => {
    console.log(`Listening on port ${process.env.PORT}`);
  });
}

serverConnection();
