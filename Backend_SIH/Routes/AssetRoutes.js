const express=require("express")
const router=express.Router();
const {newAsset}=require("../Controllers/AssetsController")
const uploadMultiple=require("../Middleware/Multer")

router.post("/newAsset",uploadMultiple,newAsset);

module.exports=router;