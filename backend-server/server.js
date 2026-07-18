const express = require("express");
const db = require("./db");
const cors = require("cors");

const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.use(cors());
app.use(express.json());

app.post("/login", (req,res)=>{

const {username,password}=req.body;
console.log(username, password);

const sql="SELECT * FROM admins WHERE username=?";

db.query(sql,[username],async(err,result)=>{

if(err){
return res.status(500).json(err);
}

if(result.length===0){
return res.status(401).json({
message:"User not found"
});
}

const admin=result[0];

if(password !== admin.password){
return res.status(401).json({
message:"Wrong password"
});
}

res.json({
message:"Login successful"
});

});

});

const PORT = process.env.PORT || 5000;

// Home Route
app.get("/", (req, res) => {
res.send("Welcome to Student Management System");
});
// sending data  to database
app.post("/students", (req, res) => {

    const { name, age, course, email } = req.body;

    const sql = `
        INSERT INTO students (name, age, course, email)
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [name, age, course, email], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Student Added Successfully!"
        });

    });

});


app.delete("/students/:id", (req, res) => {

    const id = req.params.id;

    const sql = "DELETE FROM students WHERE id = ?";

    db.query(sql, [id], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Student Deleted Successfully!"
        });

    });

});

// Student API
app.get("/students", (req, res) => {

    const sql = "SELECT * FROM students";

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

});

app.put("/students/:id", (req, res) => {
    const id = req.params.id;
    const { name, age, course, email } = req.body;

    const sql =
      "UPDATE students SET name=?, age=?, course=?, email=? WHERE id=?";

    db.query(sql, [name, age, course, email, id], (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }

        res.send("Student Updated Successfully");
    });
});
// Dashboard API
app.get("/dashboard", (req, res) => {

    const sql = `
    SELECT
    COUNT(*) AS totalStudents,
    AVG(age) AS averageAge,
    MAX(age) AS highestAge
    FROM students
    `;

    db.query(sql, (err, result) => {

        if(err){
            return res.status(500).json(err);
        }

        res.json(result[0]);

    });

});


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});