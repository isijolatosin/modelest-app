const mongoose = require("mongoose");

const OrderItemSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

// to create a virtual id of the user
OrderItemSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

OrderItemSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("OrderItem", OrderItemSchema);
