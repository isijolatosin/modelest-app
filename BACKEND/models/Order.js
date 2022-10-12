const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  orderItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderItem",
      required: true,
    },
  ],
  shippingAddress1: {
    type: String,
    required: true,
  },
  shippingAddress2: {
    type: String,
  },
  phone: {
    type: String,
  },
  status: {
    type: String,
    required: true,
    default: "Pending",
  },
  totalPrice: {
    type: Number,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  dateOrdered: {
    type: Date,
    default: Date.now,
  },
  city: {
    type: String,
  },
  zip: {
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
});

// to create a virtual id of the user
OrderSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

OrderSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Order", OrderSchema);
