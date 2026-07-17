# 🎓 Student Management System

A full-stack web application built to manage student records efficiently.  
This project allows users to add, view, edit, delete, and search student information through a modern web interface.

---

## 🚀 Features

- ✅ Add new student records
- ✅ View all students
- ✅ Edit student details
- ✅ Delete student records
- ✅ Search students
- ✅ Pagination support
- ✅ Responsive user interface
- ✅ REST API integration
- ✅ MySQL database management

---

## 🛠️ Technologies Used

### Frontend

- React.js
- JavaScript (ES6+)
- Axios
- HTML5
- CSS3
- Vite

### Backend

- Node.js
- Express.js
- REST API

### Database

- MySQL

### Tools

- VS Code
- Git & GitHub
- MySQL Workbench
- Postman

---

## 📂 Project Structure

```
Student-Management-System
│
├── backend-server
│   ├── server.js
│   ├── db.js
│   ├── package.json
│
├── frontend-client
│   ├── src
│   ├── public
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/pavankalyandantu/Student-Management-System.git
```

---

## Backend Setup

Go to backend folder:

```bash
cd backend-server
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```
DB_PASSWORD=your_mysql_password
```

Start backend server:

```bash
node server.js
```

Backend runs on:

```
http://localhost:5000
```

---

## Frontend Setup

Open another terminal:

```bash
cd frontend-client
```

Install dependencies:

```bash
npm install
```

Start React application:

```bash
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## 🗄️ Database Setup

Install MySQL and create database:

```sql
CREATE DATABASE student_management;
```

Configure your database connection in:

```
backend-server/db.js
```

---

## 🔌 API Endpoints

### Get All Students

```
GET /students
```

### Add Student

```
POST /students
```

### Delete Student

```
DELETE /students/:id
```

---

## 📸 Screenshots

Add your project screenshots here:

```
![Dashboard](screenshots/dashboard.png)

![Add Student](screenshots/add-student.png)

![Student Table](screenshots/student-table.png)
```

---

## 🎯 Future Improvements

- User authentication
- Admin login
- Student profile images
- Cloud deployment
- Advanced dashboard analytics

---

## 👨‍💻 Author

**Pavan Kalyan Dantu**

Full Stack Developer  
React.js | Node.js | MySQL

GitHub:
https://github.com/pavankalyandantu

---

⭐ If you like this project, consider giving it a star!