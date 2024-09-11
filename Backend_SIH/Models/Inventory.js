const mongoose =require("mongoose")
const inventorySchema=new mongoose.Schema({
       purchaseDate:{
        type:Date,
        required:true
       },
       piecesPurchased:{
        type:Number,
        required:true,
       },
       costPerPiece:{
        type:Number,
        required:true
       },
       expiryDate:{
        type:Date,
        required:true
       },
       purpose:{
        type:String,
        required:true
       },
       expenditure:{
        type:Number,
        required:true
       },
       billImage:{
        type:Array,
        required:true
       },
       review:{
        type:String,
        required:true
       }
})
module.exports= new mongoose.model("inventory",inventorySchema)