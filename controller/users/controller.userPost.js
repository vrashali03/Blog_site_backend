const Post = require("../../models/post");

async function postByUserId(req, res) {
  const { userId } = req.params;
  try {
    const userPosts = await Post.find({ author: userId });
    return res.send(userPosts);
  } catch (error) {
    return res.status(400).send(error);
  }
}

module.exports = {
  postByUserId,
};
