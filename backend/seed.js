require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("./models/User");
const Visitor = require("./models/Visitor");
const Appointment = require("./models/Appointment");

mongoose.connect(process.env.MONGO_URI);

const seedDatabase = async () => {
    try {

        // Clear existing data
        await User.deleteMany();
        await Visitor.deleteMany();
        await Appointment.deleteMany();

        const hashedPassword = await bcrypt.hash("password123", 10);

        // Create users
        await User.create([
            {
                name: "Admin User",
                email: "admin@example.com",
                password: hashedPassword,
                role: "Admin"
            },
            {
                name: "Employee User",
                email: "employee@example.com",
                password: hashedPassword,
                role: "Employee"
            }
        ]);

        // Create visitors
        await Visitor.create([
            {
                visitorName: "John Doe",
                email: "john@example.com",
                phone: "9876543210",
                purpose: "Project Discussion",
                personToMeet: "Admin User",
                visitDate: new Date(),
                status: "Not Checked In"
            },
            {
                visitorName: "Alice Smith",
                email: "alice@example.com",
                phone: "9876543211",
                purpose: "Interview",
                personToMeet: "Employee User",
                visitDate: new Date(),
                status: "Checked In"
            },
            {
                visitorName: "Rahul Kumar",
                email: "rahul@example.com",
                phone: "9876543212",
                purpose: "Meeting",
                personToMeet: "Admin User",
                visitDate: new Date(),
                status: "Checked Out"
            }
        ]);

        // Create appointment
        await Appointment.create([
            {
                visitorName: "John Doe",
                employeeName: "Admin User",
                appointmentDate: "2026-08-15",
                appointmentTime: "10:00 AM",
                purpose: "Project Discussion",
                status: "Approved"
            },
            {
                visitorName: "Alice Smith",
                employeeName: "Employee User",
                appointmentDate: "2026-08-16",
                appointmentTime: "02:00 PM",
                purpose: "Interview",
                status: "Pending"
            }
        ]);

        process.exit();

    } catch (error) {

        console.log(error);

        process.exit(1);
    }
};

seedDatabase();