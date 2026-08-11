# Visitor Pass Management System

A full-stack **MERN (MongoDB, Express.js, React.js, Node.js)** application for managing visitors in an organization. The system allows administrators and employees to register visitors, schedule appointments, generate visitor passes with QR codes, manage check-in/check-out, and notify visitors through email and SMS.

---

# Features

## Authentication

- User Registration
- User Login
- JWT Authentication
- Password Hashing using bcrypt
- Protected Routes
- Role-Based Access Control (Admin & Employee)

---

## Visitor Management

- Add Visitor
- Edit Visitor
- Delete Visitor (Admin Only)
- Search Visitors
- Filter Visitors by Status
- Upload Visitor Photo
- QR Code Generation
- Visitor Pass PDF Download
- Visitor Check-In / Check-Out
- CSV Export

---

## Appointment Management

- Schedule Appointment
- View Appointments
- Update Appointment
- Delete Appointment

---

## Notifications

- Email Notifications using Nodemailer
- SMS Notifications using Twilio

---

## Technologies Used

### Frontend

- React.js
- React Router DOM
- Axios
- Bootstrap
- QRCode React
- jsPDF

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Multer
- Nodemailer
- Twilio

---

# Project Structure

```
VisitorPassManagement/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── utils/
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# Prerequisites

Before running the project, make sure the following are installed:

- Node.js (v18 or above)
- npm
- MongoDB Atlas account (or local MongoDB)
- Gmail Account with App Password
- Twilio Account

---

# Installation

## 1. Clone the Repository

```bash
git clone <repository-url>
cd VisitorPassManagement
```

---

## 2. Install Backend Dependencies

```bash
cd backend
npm install
```

---

## 3. Install Frontend Dependencies

Open a new terminal.

```bash
cd frontend
npm install
```

---

# Environment Variables

Create a file named **.env** inside the **backend** folder.

Add the following variables:

```env
PORT=4000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password

TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
```

> **Note:** Never commit your `.env` file to version control. Use your own credentials.

---

# Running the Project

## Start Backend

```bash
cd backend
npm start
```

or

```bash
npm run dev
```

Backend runs on:

```
http://localhost:4000
```

---

## Start Frontend

Open another terminal.

```bash
cd frontend
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# User Roles

### Admin

- Manage all visitors
- Delete visitors
- Manage appointments
- View reports

### Employee

- Add visitors
- Edit visitor details
- Schedule appointments
- Check-In / Check-Out visitors

---

# Security Features

- JWT Authentication
- Password Hashing using bcrypt
- Role-Based Authorization
- Backend Input Validation
- Environment Variables for Sensitive Credentials
- Restricted CORS Configuration

---

# API Features

- RESTful API
- CRUD Operations
- Image Upload using Multer
- QR Code Generation
- PDF Generation
- Email Notifications
- SMS Notifications

## Seed Demo Data

To populate the database with sample users, visitors, and appointments:

```bash
cd backend
npm run seed
```

Demo Accounts

Admin

Email: admin@example.com

Password: password123

Employee

Email: employee@example.com

Password: password123