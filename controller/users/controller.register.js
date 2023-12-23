const bcrypt = require("bcrypt");

const salt = bcrypt.genSaltSync(10);

//model import for register
const User = require("../../models/user");

//function for User register
async function registerUser(req, res) {
  const { name, username, password } = req.body;
  //validation for name
  try {
    if (!name) {
      return res.status(404).send({
        Error: "Please enter name!!",
      });
    }
    if (!/^[ a-z A-Z ]*$/.test(name)) {
      return res.status(400).send({
        Error: "Invalid Name!!",
      });
    }

    //validation for username
    if (!username) {
      return res.status(404).send({
        Error: "Please enter username!!",
      });
    }
    if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) {
      return res.status(400).send({
        error: "Invalid Username!",
      });
    }
    //validation for password
    if (!password) {
      return res.status(404).send({
        Error: "Please enter password!!",
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
      Error: error,
    });
  }
  try {
    const newUser = await User.create({
      name,
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.send(newUser);
  } catch (error) {
    res.status(400).send(error);
  }
}

module.exports = {
  registerUser,
};
