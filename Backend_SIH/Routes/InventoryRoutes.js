const express=require("express");
const { newInventory } = require("../Controllers/InventoryController");
const uploadMultiple = require("../Middleware/Multer");
const router=express.Router();
router.post("/newInventory",uploadMultiple,newInventory)

module.exports =router;