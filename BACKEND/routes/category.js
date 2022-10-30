const express = require("express");
const router = express.Router();

const {
  getCategory,
  createCategory,
  deleteCategory,
  updateCategory,
} = require("../controllers/category");

router.route("/").get(getCategory).post(createCategory);
router.route("/:id").delete(deleteCategory).patch(updateCategory);

module.exports = router;
