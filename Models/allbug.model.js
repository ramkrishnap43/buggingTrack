const mongoose=require("mongoose");
const UserSchema=mongoose.Schema({
    bugName:String,
    bugColor:String
});
const allbugModel=mongoose.model("allbug",UserSchema);
module.exports=allbugModel;