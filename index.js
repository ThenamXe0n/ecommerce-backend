require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/products");
const categoriesRouter = require("./routes/Category");
const brandsRouter = require("./routes/Brand");
const UserRouter = require("./routes/User");
const AuthRouter = require("./routes/Auth");
const CartRouter = require("./routes/Cart");
const OrderRouter = require("./routes/Order");
const cors = require("cors");
const path = require('path');

const app = express();
const port = process.env.PORT;

app.use(express.static(path.resolve(__dirname, 'build')));

mongoose
  .connect(process.env.MONGODB_URL)
  .then(console.log("db is connected"));

app.use(
  cors({origin:'*'})
);
app.use(express.json());
app.use("/products", productRoutes);
app.use("/categories", categoriesRouter);
app.use("/brands", brandsRouter);
app.use("/user", UserRouter);
app.use("/auth", AuthRouter);
app.use("/cart", CartRouter);
app.use("/orders", OrderRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
