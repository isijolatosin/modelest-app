const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  registerUser,
  deleteUser,
  updateUser,
  getUser,
  userLogin,
  getUserCount,
} = require("../controllers/users");

router.route("/").get(getAllUsers);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);
router.route("/get/count").get(getUserCount);
router.route("/login").post(userLogin);
router.route("/register").post(registerUser);

module.exports = router;
