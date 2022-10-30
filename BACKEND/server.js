require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const connectDB = require("./db/connect");
const cloudinary = require("cloudinary").v2;
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFound = require("./middleware/not-found");
const productsRouter = require("./routes/products");
const usersRouter = require("./routes/users");
const categoryRouter = require("./routes/category");
const orderRouter = require("./routes/orders");
const authJwt = require("./helpers/jwt");
const errorHandler = require("./helpers/error-handler");

const PORT = process.env.PORT || 3000;
const api = process.env.BASE_ROUTE;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// middleware
app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(authJwt());
// Capture all errors
app.use(errorHandler);

app.use(express.static("../build"));
app.use(express.static("../public"));

// routes
app.use(`${api}/products`, productsRouter);
app.use(`${api}/users`, usersRouter);
app.use(`${api}/categories`, categoryRouter);
app.use(`${api}/orders`, orderRouter);

// not found
app.use(notFound);
//  error handler
app.use(errorHandlerMiddleware);

// server running
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI).then(() =>
      console.log("Database Connection is ready...")
    );
    app.listen(PORT, console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

// server func invoke
start();
