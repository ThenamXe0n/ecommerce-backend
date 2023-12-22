const mongoose = require('mongoose');


const ProductSchema = new mongoose.Schema({
    title:{type:String},
    description:{type:String},
    price:{type:Number},
    discountPercentage:{type:Number},
    rating:{type:Number,default:0},
    stock:{type:Number},
    brand:{type:String},
    category:{type:String},
    thumbnail:{type:String},
    images:{type:[String] },
    deleted:{type:Boolean,default:false},
}); 

const virtual = ProductSchema.virtual('id');
virtual.get(function(){
    return this._id
})
ProductSchema.set('toJSON',{
    virtuals: true,
    versionKey:false,
    transform:function(doc,ret){delete ret._id}
})



exports.Product = mongoose.model('Product',ProductSchema);