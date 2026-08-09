const requireRole = require("../middleware/requireRole");
const upload = require("../config/multer");
const express=require("express");
const requireAuth=require("../middleware/requireAuth");
const {createVisitor,getVisitors,getVisitor,updateVisitor,deleteVisitor}=require("../controllers/visitorController");

const router=express.Router();
router.use(requireAuth);
router.post(
    "/",
    requireRole("Admin", "Employee"),
    upload.single("photo"),
    createVisitor
);
router.get("/", getVisitors);
router.get("/:id", getVisitor);
router.put(
    "/:id",
    requireRole("Admin", "Employee"),
    updateVisitor
);
router.delete(
    "/:id",
    requireRole("Admin"),
    deleteVisitor
);
module.exports=router;