
const path = require("path");
require ("dotenv").config();
const visitorRoutes = require("./routes/visitorRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes= require("./routes/userRoutes");

const app = express();
connectDB();

// Middleware
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/user",userRoutes);
app.use("/api/visitor", visitorRoutes);
app.use("/api/appointment", appointmentRoutes);

app.get("/", (req, res) => {
    res.json({message:"Visitor pass management API is running"});
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});