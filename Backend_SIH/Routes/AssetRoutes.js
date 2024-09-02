const express=require("express")
const router=express.Router();
const {newAsset,getAssets}=require("../Controllers/AssetsController")
const uploadMultiple=require("../Middleware/Multer")

router.post("/newAsset",uploadMultiple,newAsset);
router.get("/getAssets",getAssets)
module.exports=router;