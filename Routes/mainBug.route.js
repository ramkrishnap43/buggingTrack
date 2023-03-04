const express=require("express");
const allbugModel = require("../Models/allbugs.model");
const bug=express.Router();
bug.use(express.json());

bug.get("/",async(req,res)=>{
    res.send(await allbugModel.find());

});

bug.get("/:color",async(req,res)=>{
    const bugType=req.params.color;
    res.send(await allbugModel.find({bugColor:bugType}));
});
bug.post("/add",async(req,res)=>{
    await allbugModel.create(req.body);
    res.status(200).send({msg:"Bug succesffully Added"});
});
bug.delete("/removebug/:id",async(req,res)=>{
    const ids=req.params.id;
    await allbugModel.findOneAndDelete({_id:ids});
    res.status(200).send({msg:"Bug Removed succesffully"});
});
module.exports=bug;