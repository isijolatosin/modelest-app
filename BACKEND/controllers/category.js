const { StatusCodes } = require("http-status-codes");
const { createCustomError } = require("../errors/custom-error");
const asyncWrapper = require("../middleware/async");
const { Category } = require("../models/Category");

// GET ALL CATEGORY*************************
const getCategory = asyncWrapper(async (req, res) => {
  const category = await Category.find({});
  res.status(StatusCodes.OK).json({ category });
});

// POST CATEGORY****************************
const createCategory = asyncWrapper(async (req, res, next) => {
  const category = await Category.create(req.body);
  if (!category) {
    return next(createCustomError("Category can not be created!", 404));
  }

  res.status(StatusCodes.CREATED).json({ category });
});

// DELETE CATEGORY***************************
const deleteCategory = asyncWrapper(async (req, res, next) => {
  const { id: categoryID } = req.params;
  const category = await Category.findOneAndDelete({ _id: categoryID });
  if (category) {
    res.status(StatusCodes.OK).json({ category });
  } else {
    // return res
    // .status(400)
    // .json({ success: false, error: `No category with id: ${categoryID}` });
    return next(createCustomError(`No product with id : ${categoryID}`, 404));
  }
});

// UPDATE CATEGORY****************************
const updateCategory = asyncWrapper(async (req, res, next) => {
  const { id: categoryID } = req.params;
  const category = await Category.findOneAndUpdate(
    { _id: categoryID },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!category) {
    return next(createCustomError(`No category with id : ${categoryID}`, 404));
  }
  res.status(StatusCodes.OK).json({ category });
});

module.exports = {
  getCategory,
  createCategory,
  deleteCategory,
  updateCategory,
};
