const mongoose=require("mongoose")

const Assetschema=new mongoose.Schema({
     Type:{
        type:String,
        required:true
     },
     scheme:{
        type:String,
        required:false
     },
     longitude:{
        type:Number,
        required:true
     }  ,
     latitude:{
        type:Number,
        required:true
     },
     assetImage:{
        type:Array,
        required:true
     },
     budget:{
        type:Number,
        required:true
     },
     startDate:{
        type:Date,
        required:true
     },
     completionDate :{
       type:Date,
       required:true
     },
     expiry:{
        type:String,
        required:true
     },
     maintainancePeriod:{
        type:Number,
        required:true
     },
     lastMaintenanceDate:{
      type:Date,
      required:false
     },
     contractorName:{
        type:String,
        required:true
     },
     contractorBudget:{
        type:Number,
        required:true
     },
     warranty:{
        type:String,
        required:true
     },
     completionTenure:{
        type:Number,
        required:true
     },
     contactNo:{
        type:Number,
        required:true
     },
     review:{
        type:String,
        required:false
     },
     recieptImage:{
        type:Array,
        required:true
     }



})
const assets=new mongoose.model("assets",Assetschema)
module.exports=assets