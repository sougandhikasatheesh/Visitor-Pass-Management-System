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


##Screenshots 


<img width="1920" height="1080" alt="Screenshot (115)" src="https://github.com/user-attachments/assets/1faa31af-d8b4-4050-8c90-8d898195b242" />
<img width="1920" height="1080" alt="Screenshot (114)" src="https://github.com/user-attachments/assets/41383791-8eef-4969-88df-6acc8208ed83" />
<img width="1920" height="1080" alt="Screenshot (113)" src="https://github.com/user-attachments/assets/0d829e48-c77b-4ed5-94db-6739782d11da" />
<img width="1920" height="1080" alt="Screenshot (112)" src="https://github.com/user-attachments/assets/9ca05b42-75b3-49f9-8331-5d708686949a" />
<img width="1920" height="1080" alt="Screenshot (111)" src="https://github.com/user-attachments/assets/eca5a622-1eec-406f-88d8-2304b4afebbd" />
<img width="1920" height="1080" alt="Screenshot (110)" src="https://github.com/user-attachments/assets/3bf9bcb6-1688-4176-96f2-a24d3100c4ff" />
<img width="1920" height="1080" alt="Screenshot (109)" src="https://github.com/user-attachments/assets/5555c142-e986-47c5-9998-14dc7227a169" />
