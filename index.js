const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");

const { dbConnection } = require("./config/mongo.config");

const app = express();

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://gregarious-sherbet-652f35.netlify.app/, http://localhost:3000/"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const routes = require("./controller/controller.routes");

app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:3000",
      "https://gregarious-sherbet-652f35.netlify.app",
    ],
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
