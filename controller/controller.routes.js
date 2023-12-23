const express = require("express");
const multer = require("multer");
const path = require("path");
const app = express();

const route = express.Router();

const destination = "/opt/render/project/src/uploads/";
const upload = multer({ dest: destination });

//All the imports are here
const { registerUser } = require("./users/controller.register");
const { userLogin } = require("./users/controller.login");
const { verifyUser } = require("./users/controller.verifyUser");
const { logoutUser } = require("./users/controller.logout");
const { postByUserId } = require("./users/controller.userPost");
const { userProfile } = require("./users/conntroller.userProfile");
const {
  createPost,
  editPost,
  getPosts,
  getPostsById,
} = require("./posts/controller.post");

//All the routes are given here
//users
route.post("/register", registerUser);
route.post("/login", userLogin);
route.get("/userVerification", verifyUser);
route.post("/logout", logoutUser);
route.get("/posts/:userId", postByUserId);
route.get("/profile/:userId", userProfile);
//posts
route.post("/post", upload.single("file"), createPost);
route.put("/post", upload.single("file"), editPost);
route.get("/post", getPosts);
route.get("/post/:id", getPostsById);

module.exports = route;
