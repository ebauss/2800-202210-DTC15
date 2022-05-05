// Constants used for node dependencies
const express = require('express');
const bodyparser = require("body-parser");
const bcrypt = require('bcrypt');
const mysql = require('mysql2');

// Initiate express
const app = express();

// Connect client to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'yourpasswordhere',
    database: 'sustainably',
    multipleStatements: false
})


// Parse through the body of the post request
app.use(bodyparser.urlencoded({
    extended: true
}));

// Route to listen for homepage
app.listen(process.env.PORT || 3000, (err) => {
    if (err) {
        console.log(err);
    }
})

// Route for POST request for postUserCredentials
app.post('/loginWithUserCredentials', (req, res) => {
    console.log(`Your email is: ${req.body.email}`);

    connection.query(`SELECT password FROM users WHERE email = '${req.body.email}';`, (err, results, fields) => {
        if (err) {
            console.log(err);
        } else {
            console.log(results);
        }
    });

    // Hash the inputted password and check if it matches with password from db. HARDCODED PASSWORD: password
    bcrypt.compare(req.body.password, '$2b$10$YTZ2K3QsVDmotIHV4sMAROPTsBgHu96ZmhYJJAGXzHahgrU8EUwx.', (err, result) => {
        if (err) {
            console.log(err);
        } else if (result) {
            console.log(`Your password is valid!`); // for debugging only
        } else {
            console.log('Your password was rejected!');
        }
    })
})

app.post('/createNewUser', (req, res) => {
    // CREATING AN ACCOUNT: Hash the user's password to store into database
    const saltRounds = 10;
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`Your password is: ${hash}`); // for debugging only
        }
    });
})

// Instead of using app.get() for every file, just use express.static middleware and it serves all required files to client for you.
app.use(express.static('./public'));