const {Product} = require("../model/Product");


exports.createProduct = async (req, res) => {
  //this product we have to get from API body
  try {
    const product = new Product(req.body);
    const response = await product.save();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.fetchAllProducts = async (req, res) => {
  // filter = {"category":["smartphone","laptops"]}
  // sort = {_sort:"price",_order="desc"}
  // pagination = {_page:1,_limit=10}

 let condition = {}
 if(!req.query.admin){
  condition.deleted = {$ne:true}
 }

  let query = Product.find(condition);
  let totalProductsQuery = Product.find(condition);
  if (req.query.category) {
    query = query.find({ category: req.query.category });
    totalProductsQuery = totalProductsQuery.find({
      category: req.query.category,
    });
  }
  if (req.query.brand) {
    query = query.find({ brand: req.query.brand });
    totalProductsQuery = totalProductsQuery.find({
      brand: req.query.brand,
    });
  }
  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
  }

  const totalDocs = await totalProductsQuery.count().exec();
  console.log({ totalDocs });

  if (req.query._page && req.query._limit) {
    const pageSize = req.query._limit;
    const page = req.query._page;
    query = query.skip(pageSize * (page - 1)).limit(pageSize);
  }

  try {
    const docs = await query.exec();
    res.set("X-Total-Count", totalDocs);
    res.status(200).json(docs);
    console.log();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.fetchProductsById = async (req, res) => {
  const id = req.params['id'];
  try {
    const data = await Product.findById(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProductsById = async (req,res) =>{
  const id = req.params['id'];
  try{
    const product = await Product.findByIdAndUpdate(id,req.body,{new:true});
    res.status(200).json(product)
  }catch(error){
    res.status(400).json({error: error.message})
  }
}
