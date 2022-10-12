require("dotenv/config");
const asyncWrapper = require("../middleware/async");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { createCustomError } = require("../errors/custom-error");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// GET ALL USERS***********************
const getAllUsers = asyncWrapper(async (req, res) => {
  const user = await User.find({}).select("-passwordHash");
  res.status(StatusCodes.OK).json({ user });
});

// GET SINGLE USER**********************
const getUser = asyncWrapper(async (req, res, next) => {
  const { id: userID } = req.params;
  const user = await User.findOne({ _id: userID }).select("-passwordHash");
  if (!user) {
    return next(createCustomError(`No user with id : ${userID}`, 404));
  }
  res.status(StatusCodes.OK).json({ user });
});

// UPDATE USER**************************
const updateUser = asyncWrapper(async (req, res, next) => {
  // a user trigger forget btn and call an endpoint (create this new endpoint) to fetch the user by email. user credentials (id) is sent with a call to update user and the id is used here.
  const { id: userID } = req.params;
  const userObj = {
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.passwordHash, 10),
    phonenumber: req.body.phonenumber,
    isAdmin: req.body.isAdmin,
    zip: req.body.zip,
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
  };
  const user = await User.findOneAndUpdate({ _id: userID }, userObj, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    return next(createCustomError(`No user with id : ${userID}`, 404));
  }
  res.status(StatusCodes.OK).json({ user });
});

// DELETE USER***************************
const deleteUser = asyncWrapper(async (req, res, next) => {
  const { id: userID } = req.params;
  const user = await User.findOneAndDelete({ _id: userID });
  if (!user) {
    return next(createCustomError(`No user with id : ${userID}`, 404));
  }
  res.status(StatusCodes.OK).json({ success: true, message: "User Deleted!" });
});

// REGISTER USER**************************
const registerUser = async (req, res) => {
  const userExist = await User.findOne({ email: req.body.email });

  if (userExist) {
    return res.status(400).send("User already exists");
  }

  if (!userExist) {
    const userObj = {
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      passwordHash: bcrypt.hashSync(req.body.passwordHash, 10),
      phonenumber: req.body.phonenumber,
      isAdmin: req.body.isAdmin,
      zip: req.body.zip,
      street: req.body.street,
      city: req.body.city,
      country: req.body.country,
    };

    await User.create(userObj);

    res
      .status(StatusCodes.CREATED)
      .json({ success: true, message: "User Registered Successfully!" });
  }
};

// LOGIN USER********************************
const userLogin = asyncWrapper(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  const secret = process.env.JWT_TOKEN;

  if (!user) {
    return next(createCustomError(`No user with : ${req.body.email}`, 404));
  }

  if (user && bcrypt.compareSync(req.body.passwordHash, user.passwordHash)) {
    const token = jwt.sign(
      {
        userId: user.id,
        isAdmin: user.isAdmin,
      },
      secret,
      { expiresIn: "1d" }
    );
    res
      .status(StatusCodes.OK)
      .json({ msg: "User Authenticated!", user: user.email, token: token });
  } else {
    return next(createCustomError("Unauthorized Access!!!", 401));
  }
});

// GET TOTAL NUMBER OF USERS
const getUserCount = asyncWrapper(async (req, res) => {
  await User.countDocuments()
    .then((count) =>
      res.status(StatusCodes.OK).json({ success: true, userCount: count })
    )
    .catch((err) =>
      res.status(500).json({ success: false, message: err.message })
    );
});

module.exports = {
  getAllUsers,
  registerUser,
  getUser,
  updateUser,
  deleteUser,
  userLogin,
  getUserCount,
};
