const { User } = require("../model/User");

exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    const response = await user.save();
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.fetchUser = async (req, res) => {
  let query = User.find({});
  if (req.query.email) {
    query = query.find({ email: req.query.email });
  }
  try {
    const docs = await query.exec();
    res.status(200).json(docs);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.fetchUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id, "name email address").exec();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(doc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
