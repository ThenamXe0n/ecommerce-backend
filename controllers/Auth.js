const User = require("../model/User");

exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    const doc = await user.save();
    res.status(200).json(doc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const user = user
      .findOne({ email: req.body.email }, "id name email")
      .exec();
    //thois is just temprory we will use strong password auth
    if (!user) {
      res.status(401).json({ messsage: "no such user email found" });
    } else if (user.password === req.body.password) {
      res.status(201).json({ id: user.id, email: user.email, name: user.name });
    } else {
      res.status(401).json({ message: "invalid credentials" });
    }
  } catch (error) {
    res.status(400).json({ error: err.message });
  }
};
