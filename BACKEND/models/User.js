const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "must provide username"],
    trim: true,
    maxlength: [200, "name maximum character exceeded!"],
  },
  firstname: {
    type: String,
    required: [true, "must provide firstname"],
    trim: true,
    maxlength: [200, "name maximum character exceeded!"],
  },
  lastname: {
    type: String,
    required: [true, "must provide lastname"],
    trim: true,
    maxlength: [200, "name maximum character exceeded!"],
  },
  email: {
    type: String,
    required: [true, "must provide email"],
    trim: true,
    maxlength: [100, "name maximum character exceeded!"],
  },
  passwordHash: {
    type: String,
    required: [true, "must provide a password"],
    trim: true,
  },
  phonenumber: {
    type: String,
    default: "",
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  zip: {
    type: String,
    default: "",
  },
  street: {
    type: String,
    default: "",
  },
  appartment: {
    type: String,
    default: "",
  },
  city: {
    type: String,
    default: "",
  },
  state: {
    type: String,
    default: "",
  },
  country: {
    type: String,
    default: "",
  },
});

// to create a virtual id of the user
UserSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

UserSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("User", UserSchema);
