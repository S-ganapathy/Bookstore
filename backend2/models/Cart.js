const mongoose=require("mongoose");

const item=new mongoose.Schema({
    uid:{type:String,required:true},
    bookid:{type:Number,required:true}
});

const cartsdetail=mongoose.model("carts",item);

module.exports=cartsdetail;