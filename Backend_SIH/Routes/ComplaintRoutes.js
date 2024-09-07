const express=require("express")
const router=express.Router();

// const upload=require("../Middleware/Multer")
const {raiseComplaint,getComplaints}=require("../Controllers/ComplaintController");
const uploadMultiple = require("../Middleware/Multer");
router.post("/raiseComplaint", uploadMultiple, raiseComplaint);
router.get("/getComplaints",getComplaints);
module.exports=router;