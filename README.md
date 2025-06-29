# 🧠 Smart Assignment System

A full-stack web application for Admins to manage agents and efficiently distribute uploaded task lists (via Excel/CSV). Built using the MERN stack.

---

## 🚀 Features

- 🧑‍💼 **Admin Login** – Secure panel access only for Admin users.
- 📄 **Upload Lists** – Upload `.csv`, `.xlsx`, or `.xls` files containing names, phone numbers, and notes.
- 🤖 **Smart Distribution** – 
  - If 5 agents: tasks are distributed equally.
  - If < or > 5 agents: tasks are assigned using round-robin logic.
- 👨‍💻 **Agent Management** – View, create, and manage agents.
- 📋 **Task Dashboard** – View all assigned tasks with timestamp and agent mapping.
- ☁️ **Cloudinary Integration** – Uploaded files are stored securely.

---

## 🛠 Tech Stack

| Frontend        | Backend        | Others             |
|-----------------|----------------|--------------------|
| React.js        | Node.js        | Cloudinary API     |
| Tailwind CSS    | Express.js     | Excel parser (XLSX)|
| React Router    | MongoDB (Mongoose) | JWT Auth        |

---

## 📁 Folder Structure

```bash
Smart-Assignment-System/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── config/
│   └── server.js
├── client/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   └── App.jsx
└── README.md
```
ADMIN LOGIN CREDENTIALS
Email: admin@gmail.com
Password: Admin@01

INSTALLATION SETUP 
cd backend
npm install
.ENV:
DB_URL=mongodb+srv://9928zaid:<password>@cluster0.ozur1.mongodb.net
PORT=2000
JWT_SECRET=Zaid Yargatti

CLOUDINARY_CLOUD_NAME=your cloud name 
CLOUDINARY_API_KEY=your key
CLOUDINARY_API_SECRET=your secret key
(*Note : There is no register controller in this so if you have to create a new admin there is script folder run the node script js for once and admin will create and use those credentials for login or I have given already created admin use that )
npm run dev

cd fronted
npm install
npm run dev

Upload Format (Excel/CSV)
Your file must contain the following columns:

FirstName	Phone	Notes
John	9876543210	Follow up...
Alice	9123456789	VIP client

Missing columns will throw a validation error.

Pull requests are welcome! For major changes, open an issue first to discuss what you’d like to change.
 Developed By
Zaid Yargatti
Built with ❤️ using MERN stack

