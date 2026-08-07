const express=require("express");
const requireAuth=require("../middleware/requireAuth");

const{
    createAppointment,getAppointments,getAppointment,updateAppointment,deleteAppointment
}=require("../controllers/appointmentController");

const router=express.Router();
router.use(requireAuth);
router.post("/",createAppointment);
router.put("/:id", updateAppointment);
router.delete("/:id", deleteAppointment);
router.get("/", getAppointments);
router.get("/:id", getAppointment);
module.exports=router;
