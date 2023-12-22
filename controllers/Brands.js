const Brands = require("../model/Brand");

exports.createBrands = async (req, res) => {
  try {
    const brands = new Brands(req.body);
    console.log(brands);
    const response = await brands.save();

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.messsage });
  }
};

exports.fetchAllBrands = async (req, res) => {
  try {
    const brands = await Brands.find();
    res.status(200).json(brands);
    console.log(brands);
  } catch (err) {
    res.status(500).json({ error: err.messsage });
  }
};
