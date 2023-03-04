const env=require("dotenv");
env.config();
const mongoose=require("mongoose");
mongoose.set('strictQuery', false);
const dbconnect=mongoose.connect(process.env.MONGO_URL);
module.exports=dbconnect;