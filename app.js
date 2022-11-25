const express = require("express");
const cors = require("cors");
const app = express();
require('dotenv');
const mysqlConnection = require("./database");
const port = 3000;

// Your github page origin has to be written EXACTLY like this! https://behu-kea.github.io
const URL_FOR_FRONTEND = "chriz923.github.io";


app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies

// If the application is running localhost allow all requests,
// otherwise add cors for specific website
// Remember to add the NODE_ENV="prod" on server!
const cors_url = process.env.NODE_ENV === "prod" ? URL_FOR_FRONTEND : "*";
app.use(
    cors({
        origin: cors_url
    })
);
//cafes
app.get('/cafes', (req, res) => {
    const query = "SELECT * FROM cafes INNER JOIN environment ON cafes.cafe_id = environment.cafe_id ;";
    mysqlConnection.query(
        query,
        (err, results, fields) => {
            if (!err) {
                res.json(results);
            } else {
                console.log(err);
            }
        }
    );
})
//Users
app.get('/users', (req, res) => {
    const query = "SELECT * FROM users;";
    mysqlConnection.query(
        query,
        (err, results, fields) => {
            if (!err) {
                res.json(results);
            } else {
                console.log(err);
            }
        }
    );
})
//environment
app.get('/environment', (req, res) => {
    const query = "SELECT * FROM environment;";
    mysqlConnection.query(
        query,
        (err, results, fields) => {
            if (!err) {
                res.json(results);
            } else {
                console.log(err);
            }
        }
    );
})
//favorites
app.get('/favorites', (req, res) => {
    const query = "SELECT * FROM favorites;";
    mysqlConnection.query(
        query,
        (err, results, fields) => {
            if (!err) {
                res.json(results);
            } else {
                console.log(err);
            }
        }
    );
})

// This is the correct way to handle user input


// DO NOT MAKE YOUR CODE VULNERABLE TO SQL INJECTION!!!


app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
    console.log(`Node.js REST API listening at http://localhost:${port}`);
});

