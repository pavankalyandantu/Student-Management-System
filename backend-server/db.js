const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mysqlPavan$342",
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