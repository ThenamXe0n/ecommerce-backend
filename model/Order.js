const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  products: { type: [mongoose.Schema.Types.Mixed] ,requird:true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
  paymentMethod: { type: String, require: true },
  totalAmount: { type: Number, require: true },
  totalItemInCart: { type: Number, require: true },
  status: { type: String, default: "pending" },
  selectedAddress:{type:mongoose.Schema.Types.Mixed,required:true}
});

const virtual = OrderSchema.virtual("id");
virtual.get(function () {
  return this._id;
});
OrderSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});


exports.Order = mongoose.model('Order',OrderSchema);
