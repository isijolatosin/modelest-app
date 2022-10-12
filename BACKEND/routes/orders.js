const express = require("express");
const router = express.Router();

const {
  getAllOrders,
  createOrder,
  getSingleOrder,
  updateOrder,
  deleteOrder,
  getOrderCount,
  getTotalSales,
} = require("../controllers/orders");

router.route("/").get(getAllOrders).post(createOrder);
router.route("/:id").get(getSingleOrder).patch(updateOrder).delete(deleteOrder);
router.route("/get/ordercount").get(getOrderCount);
router.route("/get/totalsales").get(getTotalSales);

module.exports = router;
