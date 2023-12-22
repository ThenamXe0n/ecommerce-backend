const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    value:{type:String,unique:true},
    label:{type:String,unique:true},
    checked:{type:Boolean,default:false}
})

const virtual = CategorySchema.virtual('id');
virtual.get(function(){
    return this._id
})
CategorySchema.set('toJSON',{
    virtuals: true,
    versionKey:false,
    transform:function(doc,ret){delete ret._id}
})

module.exports = mongoose.model('Category',CategorySchema);