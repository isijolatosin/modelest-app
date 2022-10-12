const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getAllProductSelect,
  getProductCount,
  getProductFeatured,
} = require("../controllers/products");

const { uploadProductImage } = require("../controllers/uploadsController");

router.route("/").get(getAllProducts).post(createProduct);
router.route("/filter").get(getAllProductSelect);
router.route("/get/count").get(getProductCount);
router.route("/get/featured/:count").get(getProductFeatured);
router.route("/:id").get(getProduct).patch(updateProduct).delete(deleteProduct);
router.route("/uploads").post(uploadProductImage);

module.exports = router;
