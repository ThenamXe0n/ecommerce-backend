const { Order } = require("../model/Order");

exports.CreateOrder = async (req, res) => {
  try {
    const doc = new Order(req.body);
    console.log(req.body);
    const response = await doc.save();
    const result = await response.populate("user");
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.fetchOrdersByUser = async (req, res) => {
  const { user } = req.query;
  try {
    const doc = await Order.find({ user: user });
    res.status(200).json(doc);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateOrder = async (req, res) => {
  const id = req.params["id"];
  try {
    const doc = await Order.findByIdAndUpdate(id, req.body);
    res.status(200).json(doc);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.fetchAllOrders = async (req, res) => {
  // filter = {"category":["smartphone","laptops"]}
  // sort = {_sort:"price",_order="desc"}
  // pagination = {_page:1,_limit=10}

  let query = Order.find({});
  let totalProductsQuery = Order.find({});

  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
    console.log({ [req.query._sort]: req.query._order })
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
