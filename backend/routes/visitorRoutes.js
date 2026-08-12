const requireRole = require("../middleware/requireRole");
const upload = require("../config/multer");
const express=require("express");
const { validateVisitor } = require("../middleware/validationMiddleware");
const requireAuth=require("../middleware/requireAuth");
const {createVisitor,getVisitors,getVisitor,updateVisitor,deleteVisitor,checkVisitor,selfRegisterVisitor,getMyVisits}=require("../controllers/visitorController");

const router=express.Router();
router.use(requireAuth);
router.post(
    "/",
    requireRole("Admin", "Employee"),
    upload.single("photo"),
    validateVisitor,
    createVisitor
);
router.post("/self-register",requireRole("Visitor"),upload.single("photo"),selfRegisterVisitor); //visitor registering themselves

router.get("/my-visits",requireRole("Visitor"),getMyVisits);//get visitors details alone
router.get("/",requireRole("Admin", "Employee", "Security"),getVisitors);
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
router.patch(
    "/check/:id",
    requireRole("Admin", "Security"),
    checkVisitor
);
module.exports=router;