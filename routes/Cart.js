const express = require("express");
const { fetchCartByUser, addToCart, updateCart,deleteCartItem } = require("../controllers/Cart");

const router = express.Router();

router.get("/", fetchCartByUser);
router.post("/", addToCart);
router.patch("/:id",updateCart);
router.delete("/:id",deleteCartItem);

module.exports = router;
