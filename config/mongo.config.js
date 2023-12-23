const mongoose = require("mongoose");

require("dotenv").config();

async function dbConnection() {
  await mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("DB connection successfull");
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = {
  dbConnection,
};
