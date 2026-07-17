const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
  password: process.env.DB_PASSWORD,
    database: "student_management"
});

connection.connect((err) => {
    if (err) {
        console.log("Database connection failed!");
        console.log(err);
        return;
    }

    console.log("MySQL Connected Successfully!");
});

module.exports = connection;