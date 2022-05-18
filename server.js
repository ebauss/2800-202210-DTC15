// Constants used for node dependencies
const express = require('express');
const bodyparser = require("body-parser");
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
var session = require('express-session');
const req = require('express/lib/request');

// Initiate express
const app = express();

// Use the session middleware
app.use(session({
    secret: "hey shikikan",
    saveUninitialized: true,
    resave: true
}));

// Connect client to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'fUt4b4$4kur4',
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

// Route for POST request for checkUserExists
app.post('/checkEmailExists', (req, res) => {
    console.log(`Your email is: ${req.body.email}`);

    connection.query(`SELECT email FROM users WHERE email IN (?);`, [req.body.email], (err, results, fields) => {
        if (err) {
            console.log(err);
        } else {
            console.log(results)
            // Return true if there is a result; else return false
            res.send(results);
        }
    });
});

// Route for POST request for postUserCredentials
app.post('/checkIfPasswordCorrect', (req, res) => {
    console.log(`Your email is: ${req.body.email}`);

    let expectedHashedPassword = "";

    connection.query(`SELECT password, user_id, is_admin FROM users WHERE email = ?;`, [req.body.email], (err, results, fields) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`Encrypting: ${req.body.password}`);
            console.log(results);
            expectedHashedPassword = results[0].password;
            console.log(`Expect: ${expectedHashedPassword}`);
            isUserAdmin = results[0].is_admin;

            // Hash the inputted password and check if it matches with password from db
            bcrypt.compare(req.body.password, expectedHashedPassword, (err, result) => {
                if (err) {
                    console.log(err);
                } else if (result) {
                    console.log("You entered the correct password");
                    req.session.authenticated = true;
                    req.session.uid = results[0].user_id;
                    res.send({
                        isPasswordCorrect: true,
                        isAdmin: isUserAdmin
                    });
                } else {
                    console.log("You entered an incorrect password");
                    req.session.authenticated = false;
                    req.session.uid = undefined;
                    res.send({
                        isPasswordCorrect: false,
                        isAdmin: false
                    });
                }
            })
        }
    });
})

// DEBUGGING: for quickly logging in without entering credentials
app.get('/quickLogin', (req, res) => {
    req.session.authenticated = true;
    req.session.uid = 2;
    res.send('tsubasa');
});

// DEBUGGING: for quickly logging in as admin
app.get('/quickLoginAdmin', (req, res) => {
    req.session.authenticated = true;
    req.session.uid = 1;
    res.send('ac130');
})

// Retrieves all the users' data for admin.html and sends it as a JSON object
app.get('/requestUserData', (req, res) => {
    connection.query('SELECT * FROM users', (err, results, fields) => {
        if (err) {
            console.log(err);
        } else {
            res.send(results);
        }
    })
})

// Adds a new user to database in authentication.html
app.post('/createNewUser', (req, res) => {
    // CREATING AN ACCOUNT: Hash the user's password to store into database
    const saltRounds = 10;
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err);
        } 
        else
        {
            console.log(`Your password is: ${hash}`); // for debugging only

            if (req.body.password != req.body.confirm_password) {
                res.send("unmatching password");
            }
            // else if (isNAN(req.body.age)) {
            //     res.send("age is not a number")
            // }
            else if (!req.body.password || !req.body.first_name || !req.body.last_name || !req.body.email || !req.body.country || !req.body.age) {
                res.send("blank");
            }
            else {
                addNewUserToDatabase(req, hash);
                res.send("success");
            }
        }
    });
})

// ends the user's session
app.get('/logout', (req, res) => {
    req.session.authenticated = false;
    req.session.uid = undefined;

    res.send(true);
})

// DEBUGGING: check whether user is signed in
app.get('/loginStatus', (req, res) => {
    console.log(`Logged in: ${req.session.uid}`);
    res.send({
        loggedIn: req.session.authenticated,
        uid: req.session.uid
    })
});

// sends all fields for a particular user for profile.html
app.get('/checkProfile', (req, res) => {
    connection.query(`SELECT * FROM users WHERE user_id = ?`, [req.session.uid], (err, results, fields) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(results)
        }
    })
})

// updates a user's profile for profile.html
app.post('/updateProfile', (req, res) => {
    connection.query(`UPDATE users SET email = ?, age = ?, country = ?, compass_id = ? WHERE user_id = ?;`, [req.body.userEmail, req.body.userAge, req.body.userCountry, req.body.userCompassId, req.session.uid], (err, results, fields) => {
        if (err) {
            console.log(err);
        } else {
            res.send(results);
        }
    })
})

// creates a new profile for profile.html
function addNewUserToDatabase(req, hashedPassword) {
    connection.query(`INSERT INTO users (password, first_name, last_name, email, country, age, reward_points, monthly_total_points, monthly_goal_points, is_admin) 
    VALUES
    (?, ?, ?, ?, ?, ?, 0, 0, 10000, FALSE);`, [hashedPassword, req.body.first_name, req.body.last_name, req.body.email, req.body.country, req.body.age],
    (err, results, fields) => {
        if (err) {
            console.log(err);
        }
    })
}

// Retrieves all the rewards for rewards.html and sends it as a JSON object
app.get('/requestAllRewards', (req, res) => {
    connection.query('SELECT * FROM rewards', (err, results, fields) => {
        if (err) {
            console.log(err);
        } else {
            res.send(results);
        }
    })
})

// gets a list of all receipts and joins it with the matching user id and email, admin id and email
app.get('/requestReceiptData', (req, res) => {
    connection.query('SELECT * FROM receipts LEFT JOIN (SELECT user_id, email FROM users) AS user_emails ON receipts.owner_id = user_emails.user_id LEFT JOIN(SELECT user_id AS admin_id, email AS admin_email FROM users) AS admin_emails ON receipts.admin_id = admin_emails.admin_id;',
    (err, results, fields) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(results);
        }
    })
});

// gets a receipt and joins it with the matching userid and email, admin id and email.
app.post('/requestSingleReceiptData', (req, res) => {
    connection.query('SELECT * FROM receipts LEFT JOIN (SELECT user_id, email FROM users) AS user_emails ON receipts.owner_id = user_emails.user_id LEFT JOIN(SELECT user_id AS admin_id, email AS admin_email FROM users) AS admin_emails ON receipts.admin_id = admin_emails.admin_id WHERE receipt_id = ?;', req.body.receipt_id,
    (err, results, fields) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(results);
        }
    })
});

// retrieves the number of points the user holds
app.get('/getUserPoints', (req, res) => {
    connection.query(`SELECT reward_points, monthly_total_points, monthly_goal_points FROM users WHERE user_id = ?`, [req.session.uid], (err, results, fields) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(results);
        }
    })
})

// deletes a user from database
app.post('/deleteUser', (req, res) => {
    connection.query(`DELETE FROM users WHERE user_id = ?`, [req.body.userIdToDelete], (err, results, fields) => {
        if (err) {
            console.log(err);
        } else {
            res.send(req.body.userIdToDelete);
        }
    })
})

// uploads receipt image, owner, and value to database
app.post('/uploadReceipt', (req, res) => {
    connection.query(`INSERT INTO receipts (picture, owner_id, reward_points, verified_date) VALUES (?, ?, ?, ?)`, [req.body.receipt, req.session.uid, req.body.value, req.body.date],
    (err, results, fields) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(true);
        }
    })
})

// sets receipt in database as verified by an admin
app.post('/verifyReceipt', (req, res) => {
    connection.query(`UPDATE receipts SET admin_id = ?, reward_points = ?, notes = ?, verified_date = ? WHERE receipt_id = ?`,
    [req.session.uid, req.body.value * 100, req.body.notes, req.body.verified_date, req.body.receipt_id],
    (err, results, fields) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(true);
        }
    })
})

// delete receipt from database
app.post('/deleteReceipt', (req, res) => {
    connection.query(`DELETE FROM receipts WHERE receipt_id = ?`, [req.body.receipt_id], (err, results, fields) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(true);
        }
    })
})

app.get('/checkProfile/id/:user_id', (req,res) => {
    connection.query('SELECT email FROM users WHERE user_id = ?', [req.params.user_id], (err, results, fields) => {
        if (err) {
            console.log(err);
        } 
        else {
            res.send(results[0].email);
        }
    })
})

// Instead of using app.get() for every file, just use express.static middleware and it serves all required files to client for you.
app.use(express.static('./public'));