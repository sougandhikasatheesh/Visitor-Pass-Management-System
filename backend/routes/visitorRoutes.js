const express=require("express");
const requireAuth=require("../middleware/requireAuth");
const {createVisitor,getVisitors,getVisitor,updateVisitor,deleteVisitor}=require("../controllers/visitorController");

const router=express.Router();
router.use(requireAuth);
router.post("/",createVisitor);
router.get("/", getVisitors);
router.get("/:id", getVisitor);
router.put("/:id", updateVisitor);
router.delete("/:id", deleteVisitor);
module.exports=router;