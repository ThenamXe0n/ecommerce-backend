const Cart = require("../model/Cart");

exports.fetchCartByUser = async (req, res) => {
  const id = req.query.user;
  try {
    const cartItems = await Cart.find({ user: id }).populate("product");
    res.status(200).json(cartItems);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.addToCart = async (req, res) => {
  const id = req.body.user;
  console.log(id);
  const cart = new Cart({ ...req.body, user: id });
  try {
    const doc = await cart.save();
    const result = await doc.populate("product");
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateCart = async (req, res) => {
  const id = req.params["id"];
  try {
    const cart = await Cart.findByIdAndUpdate(id, req.body, { new: true });
    const result = await cart.populate('product')
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteCartItem = async (req, res) => {
  const id = req.params["id"];
  try {
    const doc = await Cart.findByIdAndDelete(id, req.body, { new: true });
    res.status(200).json(doc);
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
};
