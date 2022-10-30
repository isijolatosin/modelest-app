/* eslint-disable handle-callback-err */
const mongoose = require("mongoose");
const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");
const { Category } = require("../models/Category");

// GET ALL PRODUCT*************************
const getAllProducts = asyncWrapper(async (req, res) => {
  let filter = {};
  if (req.query.categories) {
    filter = { category: req.query.categories.split(",") };
  }
  const product = await Product.find(filter).populate("category");
  res.status(StatusCodes.OK).json({ product });
});

// GET ALL PRODUCT WITH FILTER**************
const getAllProductSelect = asyncWrapper(async (req, res) => {
  const productSelect = await Product.find({}).select(
    "name images price description brand"
  );
  res.status(StatusCodes.OK).json({ productSelect });
});

// GET SINGLE PRODUCT***********************
const getProduct = asyncWrapper(async (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res
      .status(400)
      .send("Invalide Product Id. Single product cannot be retrieved!");
  }
  const { id: productID } = req.params;
  const product = await Product.findOne({ _id: productID }).populate(
    "category"
  );
  if (!product) {
    return next(createCustomError(`No product with id : ${productID}`, 404));
  }
  res.status(StatusCodes.OK).json({ product });
});

// CREATE PRODUCT***************************
const createProduct = async (req, res) => {
  const category = await Category.findById(req.body.category);
  if (!category) {
    return res.status(400).send("Invalid Category");
  }

  await Product.create(req.body)
    .then((response) => {
      if (response) {
        res
          .status(StatusCodes.CREATED)
          .json({ success: true, message: "Product Created!" });
      }
    })
    .catch((err) => {
      return res.status(500).send("The product cannot be created!");
    });
};

// UPDATE PRODUCT***************************
const updateProduct = asyncWrapper(async (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res
      .status(400)
      .send("Invalide Product Id. Update process can't be completed!");
  }
  const { id: productID } = req.params;
  const product = await Product.findOneAndUpdate({ _id: productID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    return next(createCustomError(`No product with id : ${productID}`, 404));
  }
  res
    .status(StatusCodes.OK)
    .json({ success: true, message: "Product Updated!" });
});

// DELETE PRODUCT***************************
const deleteProduct = asyncWrapper(async (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res
      .status(400)
      .send("Invalide Product Id. Delete process can't be complete!");
  }
  const { id: productID } = req.params;
  const product = await Product.findOneAndDelete({ _id: productID });
  if (!product) {
    return next(createCustomError(`No product with id : ${productID}`, 404));
  }
  res
    .status(StatusCodes.OK)
    .json({ success: true, message: "Product Deleted!" });
});

// GET TOTAL NUMBER OF PRODUCTS
const getProductCount = asyncWrapper(async (req, res) => {
  await Product.countDocuments()
    .then((count) =>
      res.status(StatusCodes.OK).json({ success: true, productCount: count })
    )
    .catch((err) =>
      res.status(500).json({ success: false, message: err.message })
    );
});

// GET FEATURED PRODUCTS
const getProductFeatured = asyncWrapper(async (req, res) => {
  const count = req.params.count ? req.params.count : 0;
  await Product.find({ isFeatured: true })
    .limit(+count)
    .then((featured) => {
      if (featured.length < 1) {
        res
          .status(500)
          .json({ success: false, message: "No featured product found!" });
      } else {
        res.status(StatusCodes.OK).json({ success: true, featured: featured });
      }
    })
    .catch((err) =>
      res
        .status(500)
        .json({ success: false, message: "No featured product found!" })
    );
});

module.exports = {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getAllProductSelect,
  getProductCount,
  getProductFeatured,
};
