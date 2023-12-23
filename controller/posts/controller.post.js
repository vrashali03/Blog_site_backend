const jwt = require("jsonwebtoken");
const fs = require("fs").promises;

//Model import for posts
const Post = require("../../models/post");

const secret = process.env.SECRET;

//function for creating post
async function createPost(req, res) {
  const { originalname, path } = req.file;
  const pathParts = path.split("\\");
  const mainPath =
    pathParts[pathParts.length - 2] + "/" + pathParts[pathParts.length - 1];
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = mainPath + "." + ext;
  await fs.rename(mainPath, newPath);

  const { token } = req.cookies;
  try {
    const info = await jwt.verify(token, secret);
    const { title, summary, content } = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: newPath,
      author: info.id,
    });
    return res.status(200).send(postDoc);
  } catch (error) {
    return res.status(400).send(error);
  }
  //uploads\087a5b4e4d126fbb4435236d587c2d0b.jpg
}

//function for editing a post
async function editPost(req, res) {
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const pathParts = path.split("\\");
    const mainPath =
      pathParts[pathParts.length - 2] + "/" + pathParts[pathParts.length - 1];

    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = mainPath + "." + ext;
    await fs.rename(mainPath, newPath);
  }
  const { token } = req.cookies;
  try {
    const info = await jwt.verify(token, secret);
    const { id, title, summary, content } = req.body;
    const postDoc = await Post.findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);

    if (!isAuthor) {
      return res.status(400).send("You are not the author");
    }

    await postDoc.updateOne({
      title,
      summary,
      content,
      cover: newPath ? newPath : postDoc.cover,
    });

    res.send(postDoc);
  } catch (error) {
    return res.status(400).send(error);
  }
}
//function for getting all posts
async function getPosts(req, res) {
  try {
    const posts = await Post.find({})
      .populate("author", ["username"])
      .sort({ createdAt: -1 })
      .limit(20);
    return res.status(200).send(posts);
  } catch (error) {
    return res.status(400).send(error);
  }
}

//function for getting post by id
async function getPostsById(req, res) {
  const { id } = req.params;
  try {
    const postDoc = await Post.findById(id).populate("author", ["username"]);
    res.send(postDoc);
  } catch (error) {
    return res.status(400).send(error);
  }
}

module.exports = {
  createPost,
  editPost,
  getPosts,
  getPostsById,
};
