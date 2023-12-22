const express = require("express");
const {
  CreateOrder,
  fetchOrdersByUser,
  updateOrder,
  fetchAllOrders,
} = require("../controllers/Order");

const router = express.Router();

router.post("/", CreateOrder);
router.get("/", fetchOrdersByUser);
router.get("/allorder",fetchAllOrders)
router.patch("/:id", updateOrder);

module.exports = router;
