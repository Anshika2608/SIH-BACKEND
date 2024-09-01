const express=require("express")
const router=express.Router();
const uploadMultiple=require("../Middleware/Multer")
const {raiseComplaint,getComplaints}=require("../Controllers/ComplaintController")
router.post("/raiseComplaint", uploadMultiple, raiseComplaint);
router.get("/getComplaints",getComplaints);
module.exports=router;