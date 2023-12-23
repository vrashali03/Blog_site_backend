async function logoutUser(req, res) {
  //   res.cookie("token", "").send("OK");
  res.clearCookie("token");
  return res.send("ok");
}

module.exports = {
  logoutUser,
};
