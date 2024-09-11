const express=require("express");
const { newInventory, getInventory } = require("../Controllers/InventoryController");
const uploadMultiple = require("../Middleware/Multer");
const router=express.Router();
router.post("/newInventory",uploadMultiple,newInventory)
router.get("/getInventory",getInventory)
module.exports =router;