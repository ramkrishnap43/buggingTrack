const mongoose=require("mongoose");
const UserSchema=mongoose.Schema({
    email:String,
    password:String
});
const bugUserModel=mongoose.model("buguser",UserSchema);
module.exports=bugUserModel;