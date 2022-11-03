const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");
const { StatusCodes } = require("http-status-codes");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

// GET ALL ORDERS*************************
const getAllOrders = asyncWrapper(async (req, res, next) => {
  await Order.find()
    .populate("user", "firstname lastname email")
    .populate({
      path: "orderItems",
      populate: {
        path: "product",
        model: "Product",
        populate: {
          path: "category",
          model: "Category",
        },
      },
    })
    .sort({ dateOrdered: -1 })
    .then((response) => {
      if (response) {
        res.status(StatusCodes.OK).json({ response });
      }
    })
    .catch((err) => {
      if (err) {
        return next(createCustomError("No Order Found!", 404));
      }
    });
});

// GET SINGLE ORDERS*************************
const getSingleOrder = asyncWrapper(async (req, res, next) => {
  await Order.findById(req.params.id)
    .populate("user", "firstname lastname email")
    .populate({
      path: "orderItems",
      populate: {
        path: "product",
        model: "Product",
        populate: {
          path: "category",
          model: "Category",
        },
      },
    })
    .then((response) => {
      if (response) {
        res.status(StatusCodes.OK).json({ response });
      }
    })
    .catch((err) => {
      if (err) {
        return next(createCustomError("No Order Found!", 404));
      }
    });
});

// CREATE ORDER***************************
const createOrder = asyncWrapper(async (req, res, next) => {
  const orderItemsIds = Promise.all(
    req.body.orderItems.map(async (orderItem) => {
      const result = await OrderItem.create({
        quantity: orderItem.quantity,
        // The product will be the orderItem id
        product: orderItem.id,
      });

      return result._id;
    })
  );
  const orderItemResolved = await orderItemsIds;

  // calculate price
  const _totalPrices = await Promise.all(
    orderItemResolved.map(async (orderitemId) => {
      const orderItem = await OrderItem.findById(orderitemId)
        .populate("quantity")
        .populate({
          path: "product",
          model: "Product",
        });
      const totalPrice = orderItem.product.price * orderItem.quantity;
      return totalPrice;
    })
  );
  const TOTALPRICE = _totalPrices.reduce((a, b) => a + b, 0);

  const order = await Order.create({
    orderItems: orderItemResolved,
    shippingAddress1: req.body.shippingAddress1,
    shippingAddress2: req.body.shippingAddress2,
    phone: req.body.phone,
    status: req.body.status,
    totalPrice: TOTALPRICE,
    user: req.body.user,
    city: req.body.city,
    zip: req.body.zip,
    state: req.body.state,
    country: req.body.country,
  });
  const returnOrder = {
    orderItems: order.orderItems,
    id: order._id,
  };

  if (!order) {
    return res.status(400).send("The order cannot be created!");
  }
  res.status(StatusCodes.OK).json({
    success: true,
    message: "Order Successfully Created!",
    order: returnOrder,
  });
});

// UPDATE PRODUCT***************************
const updateOrder = asyncWrapper(async (req, res, next) => {
  await Order.findOneAndUpdate(
    { _id: req.params.id },
    {
      status: req.body.status,
    },
    {
      new: true,
      runValidators: true,
    }
  )
    .then((response) => {
      if (response) {
        res
          .status(StatusCodes.OK)
          .json({ success: true, message: "Order updated Successfully!" });
      }
    })
    .catch((err) => {
      if (err) {
        return next(createCustomError("Order cannot be updated!", 400));
      }
    });
});

// DELETE PRODUCT***************************
const deleteOrder = asyncWrapper(async (req, res, next) => {
  Order.findOneAndDelete({ _id: req.params.id })
    .then(async (order) => {
      if (order) {
        await order.orderItems.map(async (orderItemId) => {
          await OrderItem.findOneAndDelete(orderItemId);
        });
        return res.status(StatusCodes.OK).json({
          success: true,
          message: "Order successfully deleted!",
        });
      } else {
        return next(
          createCustomError("Delete process cannot be completed!", 404)
        );
      }
    })
    .catch((err) => {
      if (err) {
        return next(createCustomError("Order cannot be deleted!", 404));
      }
    });
});

// GET TOTAL NUMBER OF PRODUCTS
const getOrderCount = asyncWrapper(async (req, res) => {
  await Order.countDocuments()
    .then((count) =>
      res.status(StatusCodes.OK).json({ success: true, orderCount: count })
    )
    .catch((err) =>
      res.status(500).json({ success: false, message: err.message })
    );
});

// GET STORE TOTAL SALES
const getTotalSales = asyncWrapper(async (req, res, next) => {
  const totalSales = await Order.aggregate([
    { $group: { _id: null, totalSales: { $sum: "$totalPrice" } } },
  ]);
  if (!totalSales) {
    return next(createCustomError("Total Sales cannot be generated!", 404));
  } else {
    res
      .status(StatusCodes.OK)
      .json({ success: true, totalSales: totalSales.pop().totalSales });
  }
});

module.exports = {
  getAllOrders,
  createOrder,
  getSingleOrder,
  updateOrder,
  deleteOrder,
  getOrderCount,
  getTotalSales,
};
