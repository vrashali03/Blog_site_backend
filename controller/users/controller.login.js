const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//model import for login
const User = require("../../models/user");

const secret = process.env.SECRET;

//function for User login
async function userLogin(req, res) {
  const { username, password } = req.body;

  //validation for username
  try {
    if (!username) {
      return res.status(404).send({
        message: "Please Enter Username",
      });
    }
    if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) {
      return res.status(400).send({
        error: "Invalid Username!",
      });
    }
    //validating for password
    if (!password) {
      return res.status(404).send({
        message: "Please Enter Password",
      });
    }
    if (password.length <= 8) {
      return res.status(400).send({
        Error: "Length of password is short",
      });
    }
  } catch (error) {
    return res.status(400).send({
      Message: "Something happened while validating values",
    });
  }
  const userCheck = await User.findOne({ username: username });

  try {
    if (userCheck !== null) {
      const passCheck = bcrypt.compareSync(password, userCheck.password);
      if (passCheck) {
        //logged in
        jwt.sign(
          { username, id: userCheck._id },
          secret,
          {},
          (error, token) => {
            if (error) {
              throw error;
            }
            res.status(200).cookie("token", token).send({
              id: userCheck._id,
              username,
            });
          }
        );
      } else {
        res.status(404).send("Wrong Credentials");
      }
    } else {
      res.status(404).send("Wrong Credentials");
    }
  } catch (error) {
    return res.status(400).send(error);
  }
}

module.exports = {
  userLogin,
};
