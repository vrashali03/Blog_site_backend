const User = require("../../models/user");
const secret = process.env.SECRET;

async function userProfile(req, res) {
  const { userId } = req.params;
  try {
    const userData = await User.findOne({ _id: userId });
    return res
      .status(200)
      .send({ name: userData.name, username: userData.username });
  } catch (error) {
    return res.status(400).send(error);
  }
}
module.exports = {
  userProfile,
};
