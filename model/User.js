const mongoose = require("mongoose"); 

const UserSchema = new mongoose.Schema({
    "Name":{type:String,require:true},
    "email":{type:String,require:true,unique:true},
    "password":{type:String,require:true},
    "address":{type:[mongoose.Schema.Types.Mixed]},
    "role":{type:String,default:"user"},
    "profile":{type:String,default:"https://cdn.pixabay.com/photo/2023/10/01/15/39/girl-8287665_640.jpg"}
})

const virtual = UserSchema.virtual('id');
virtual.get(function(){
    return this._id
})
UserSchema.set('toJSON',{
    virtuals: true,
    versionKey:false,
    transform:function(doc,ret){delete ret._id}
})



exports.User = mongoose.model('User',UserSchema);