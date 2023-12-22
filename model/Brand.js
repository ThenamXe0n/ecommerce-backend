const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema ({
    value:{type:String,require:true,unique:true},
    label:{type:String,require:true,unique:true},
    checked:{type:Boolean,default:false}
})

module.exports = mongoose.model('Brands',brandSchema);