const express=require("express")
const router=express.Router();
const upload=require("../Middleware/Multer")
const {raiseComplaint,getComplaints}=require("../Controllers/ComplaintController")
router.post("/raiseComplaint", upload.single("photo"), raiseComplaint);
router.get("/getComplaints",getComplaints);
module.exports=router;