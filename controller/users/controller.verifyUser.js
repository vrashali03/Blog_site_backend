const jwt = require("jsonwebtoken");

const secret = process.env.SECRET;

async function verifyUser(req, res) {
  const { token } = req.cookies;
  try {
    const info = await jwt.verify(token, secret);
    res.send(info);
  } catch (error) {
    return res.status(401).send({
      Error: "Unauthorized",
    });
  }
}

module.exports = {
  verifyUser,
};
