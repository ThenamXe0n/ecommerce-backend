const Category = require("../model/Category");

exports.fetchCategories = async (req, res) => {
  try {
    const categories = await Category.find({}).exec();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    const response = await category.save();
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
};
