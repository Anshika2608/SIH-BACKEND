const express=require("express")
const router=express.Router();
const {newAsset,getAssets,maintenanceAsset}=require("../Controllers/AssetsController")
const uploadMultiple=require("../Middleware/Multer")

router.post("/newAsset",uploadMultiple,newAsset);
router.get("/getAssets",getAssets)
router.get("/maintenanceAsset",maintenanceAsset)
module.exports=router;