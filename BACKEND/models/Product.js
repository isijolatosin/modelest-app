const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide a name"],
    trim: true,
    maxlength: [50, "name maximum character exceeded!"],
  },
  brand: {
    type: String,
    required: [true, "must provide a brand"],
    trim: true,
    maxlength: [50, "name maximum character exceeded!"],
  },
  type: {
    type: String,
    required: [true, "must provide a type"],
    trim: true,
    maxlength: [50, "name maximum character exceeded!"],
  },
  color: {
    type: String,
    required: [true, "must provide a color"],
    trim: true,
    maxlength: [50, "name maximum character exceeded!"],
  },
  availablecolor: {
    type: String,
  },
  length: {
    type: String,
    required: [true, "must provide a length"],
    trim: true,
  },
  availablelength: {
    type: String,
  },
  dealLength: {
    type: String,
  },
  price: {
    type: Number,
    required: [true, "must provide a price"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "must provide description"],
    trim: true,
  },
  video: {
    type: String,
  },
  density: {
    type: String,
  },
  texture: {
    type: String,
  },
  capsize: {
    type: String,
  },
  image: {
    type: String,
  },
  images: {
    type: Array,
  },
  sales: {
    type: Boolean,
    default: false,
  },
  instock: {
    type: Boolean,
    default: false,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
});

ProductSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

ProductSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Product", ProductSchema);
