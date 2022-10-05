require("dotenv/config");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const connectDB = require("./db/connect");
const cloudinary = require("cloudinary").v2;
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFound = require("./middleware/not-found");
const products = require("./routes/products");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// middleware
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(express.static("../build"));
app.use(express.static("../public"));

const PORT = process.env.PORT;
const api = process.env.BASE_ROUTE;

// app.get(`${api}/products`, (req, res) => {
//   const product = {
//     id: 1,
//     title: "Item-1",
//     image: "Some url",
//   };
//   res.send(product);
// });

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

// app.post(`${api}/products`, (req, res) => {
//   const response = req.body;
//   console.log(response);
//   res.send(response);
// });

// routes
app.use("/api/v1/products", products);

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
