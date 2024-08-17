const mongoose=require("mongoose");

const book=new mongoose.Schema({
    id:{type:Number,required:true},
    title:{type:String,required:true},
    author:{type:String,required:true},
    genre:{type:String,required:true},
    price:{type:Number,required:true},
    stock:{type:Number,required:true},
    year:{type:Number,required:true},
    publication:{type:String,required:true},
    rating:{type:Number,required:true},
    description:{type:String,required:true},
});

const bookdetail=mongoose.model("books",book);

module.exports=bookdetail;