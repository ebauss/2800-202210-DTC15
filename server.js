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
    host: 'x8autxobia7sgh74.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'wnaxoodaw136f3ln',
    password: 'l9a9drrzski0utvl',
    database: 'ztqdakl3na8kx6b2',
    multipleStatements: false
})

// Parse the body of the post request
app.use(bodyparser.urlencoded({
    extended: true
}));

// Listen for homepage on port 3000 or Heroku's provided port
app.listen(process.env.PORT || 3000, (err) => {
    if (err) {
        console.log(err);
    }
})

// check if an email exists in the database
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

// check if the user's inputted password matches with db, and sign in user if it does
app.post('/checkIfPasswordCorrect', (req, res) => {
    console.log(`Your email is: ${req.body.email}`);

    let expectedHashedPassword = "";

    connection.query(`SELECT password, user_id, is_admin FROM users WHERE email = ?;`, [req.body.email], (err, results, fields) => {
        if (err) {
            console.log(err);
        } else {
            expectedHashedPassword = results[0].password;
            isUserAdmin = results[0].is_admin;

            // hash the inputted password and check if it matches with password from db
            bcrypt.compare(req.body.password, expectedHashedPassword, (err, result) => {
                if (err) {
                    console.log(err);
                } else if (result) {
                    // password is correct. Authenticate the user
                    console.log("You entered the correct password");
                    req.session.authenticated = true;
                    req.session.uid = results[0].user_id;

                    checkNewMonthLogin(req);
                    updateLogin(req);

                    res.send({
                        isPasswordCorrect: true,
                        isAdmin: isUserAdmin
                    });
                } else {
                    // password is incorrect. Sign out user if they are signed in for some reason
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

// converts today's date into format 'YYYYMM'
function dateToMonth() {
    let today = new Date();

    // converts today's date into format YYYYMM
    return today.toISOString().split('-')[0] + today.toISOString().split('-')[1];
}

// update user's last login
function updateLogin(req) {
    let todayYearMonth = dateToMonth();

    connection.query('UPDATE users SET last_login = ? WHERE user_id = ?',
        [todayYearMonth, req.session.uid], (err, results, fields) => {
            if (err) {
                console.log(err);
            }
        })

    return;
}

// check if user logs in on a new month
function checkNewMonthLogin(req) {
    let todayYearMonth = dateToMonth();

    connection.query('SELECT last_login FROM users WHERE user_id = ?',
        [req.session.uid], (err, results, fields) => {
            if (err) {
                console.log(err);
            } else {
                if (todayYearMonth != results[0].last_login) {
                    console.log('Logged in on a new month. Resetting monthly goal.');
                    resetMonthlyPoints(req);
                }
            }
        })
}

// reset user's monthly total points if they login on a new month
function resetMonthlyPoints(req) {
    connection.query('UPDATE users SET monthly_total_points = 0 WHERE user_id = ?',
        [req.session.uid], (err, results, fields) => {
            if (err) {
                console.log(err);
            }
        })
}

// retrieves all the users' data for admin.html and sends it as a JSON object
app.get('/requestUserData', (req, res) => {
    connection.query('SELECT * FROM users', (err, results, fields) => {
        if (err) {
            console.log(err);
        } else {
            res.send(results);
        }
    })
})

// adds a new user to database. Used by authentication.html
app.post('/createNewUser', (req, res) => {
    // CREATING AN ACCOUNT: Hash the user's password to store into database
    const saltRounds = 10;
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`Your password is: ${hash}`);

            if (req.body.password != req.body.confirm_password) {
                // confirm password does not match the password field
                res.send("unmatching password");
            } else if (!req.body.password || !req.body.first_name || !req.body.last_name || !req.body.email || !req.body.country || !req.body.age) {
                // one or more required fields are blank
                res.send("blank");
            } else {
                // user creation successful. Add new user to database
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

// check whether user is signed in. Used by header
app.get('/loginStatus', (req, res) => {
    res.send({
        loggedIn: req.session.authenticated,
        uid: req.session.uid
    })
});

// sends all signed-in user's details. Used by profile.html
app.get('/checkProfile', (req, res) => {
    connection.query(`SELECT * FROM users WHERE user_id = ?`, [req.session.uid], (err, results, fields) => {
        if (err) {
            console.log(err);
        } else {
            res.send(results)
        }
    })
})

// updates signed-in user's profile. Used by profile.html
app.post('/updateProfile', (req, res) => {
    connection.query(`UPDATE users SET first_name = ?, last_name = ?, email = ?, age = ?, country = ?, compass_id = ? WHERE user_id = ?;`,
        [req.body.userFirstName, req.body.userLastName, req.body.userEmail, req.body.userAge, req.body.userCountry, req.body.userCompassId, req.session.uid], (err, results, fields) => {
            if (err) {
                console.log(err);
            } else {
                res.send(results);
            }
        })
})

// creates a new profile, used by createNewUser route
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

// retrieves all rewards for rewards.html and sends it as a JSON object
app.post('/requestAllRewards', (req, res) => {
    connection.query(`SELECT * FROM rewards ORDER BY ${req.body.criteria} ${req.body.order}`, (err, results, fields) => {
        if (err) {
            console.log(err);
        } else {
            res.send(results);
        }
    })
})

// gets a list of all receipts and joins it with the matching owner id and email, admin id and email. Used by admin.html
app.get('/getAllReceiptData', (req, res) => {
    connection.query('SELECT * FROM receipts LEFT JOIN (SELECT user_id, email FROM users) AS user_emails ON receipts.owner_id = user_emails.user_id LEFT JOIN (SELECT user_id AS admin_id, email AS admin_email FROM users) AS admin_emails ON receipts.admin_id = admin_emails.admin_id ORDER BY receipts.receipt_id DESC;',
        (err, results, fields) => {
            if (err) {
                console.log(err);
            } else {
                res.send(results);
            }
        })
});

app.get('/getUserReceipts', (req, res) => {
    connection.query('SELECT * FROM receipts LEFT JOIN (SELECT user_id, email FROM users) AS user_emails ON receipts.owner_id = user_emails.user_id LEFT JOIN (SELECT user_id AS admin_id, email AS admin_email FROM users) AS admin_emails ON receipts.admin_id = admin_emails.admin_id WHERE receipts.owner_id = ? ORDER BY receipts.receipt_id DESC;',
        [req.session.uid], (err, results, fields) => {
            if (err) {
                console.log(err);
            } else {
                res.send(results);
            }
        })
})

// gets a single receipt and joins it with the matching owner id and email, admin id and email. Used by verification.html
app.post('/getSingleReceiptData', (req, res) => {
    connection.query('SELECT * FROM receipts LEFT JOIN (SELECT user_id, email FROM users) AS user_emails ON receipts.owner_id = user_emails.user_id LEFT JOIN (SELECT user_id AS admin_id, email AS admin_email FROM users) AS admin_emails ON receipts.admin_id = admin_emails.admin_id WHERE receipt_id = ?;',
        [req.body.receipt_id], (err, results, fields) => {
            if (err) {
                console.log(err);
            } else {
                res.send(results);
            }
        })
});

// retrieves the number of points the user holds. Used by profile.html
app.get('/getUserPoints', (req, res) => {
    connection.query(`SELECT reward_points, monthly_total_points, monthly_goal_points FROM users WHERE user_id = ?`, [req.session.uid], (err, results, fields) => {
        if (err) {
            console.log(err);
        } else {
            res.send(results);
        }
    })
})

// gives user reward points
app.post('/addUserPoints', (req, res) => {
    connection.query(`UPDATE users SET reward_points = reward_points + ?, monthly_total_points = monthly_total_points + ? WHERE user_id = ?`,
        [req.body.points, req.body.points, req.session.uid], (err, results, fields) => {
            if (err) {
                console.log(err);
            } else {
                res.send(true);
            }
        })
})


// deletes a user from database. Used by admin.html
app.post('/deleteUser', (req, res) => {
    if (req.body.userIdToDelete == req.session.uid) {
        res.send(false);
    }

    // First delete all users rewards.
    connection.query(`DELETE FROM users_rewards WHERE user_id = ?`, [req.body.userIdToDelete], (err, results, fields) => {
        if (err) {
            console.log(err);
        } else {
            // Then delete all of the users receipts.
            connection.query(`DELETE FROM receipts WHERE owner_id = ?`, [req.body.userIdToDelete], (err, results, fields) => {
                if (err) {
                    console.log(err);
                } else {
                    // Then delete the user itself.
                    connection.query(`DELETE FROM users WHERE user_id = ?`, [req.body.userIdToDelete], (err, results, fields) => {
                        if (err) {
                            console.log(err);
                        } else {
                            res.send(req.body.userIdToDelete);
                        }
                    })
                }
            })
        }
    })
})

// uploads receipt image, owner, and value to database. Used by earning.html
app.post('/uploadReceipt', (req, res) => {
    connection.query(`INSERT INTO receipts (picture, owner_id, reward_points, verified_date) VALUES (?, ?, ?, ?)`, [req.body.receipt, req.session.uid, req.body.value, req.body.date],
        (err, results, fields) => {
            if (err) {
                console.log(err);
            } else {
                res.send(true);
            }
        })
})

// sets receipt in database as verified by an admin. Used by verification.html
app.post('/verifyReceipt', (req, res) => {
    // fill out the receipt with the logged in user's ID, updated reward points, and notes
    connection.query(`UPDATE receipts SET admin_id = ?, reward_points = ?, notes = ?, verified_date = ? WHERE receipt_id = ?`,
        [req.session.uid, req.body.value * 100, req.body.notes, req.body.verified_date, req.body.receipt_id],
        (err, results, fields) => {
            if (err) {
                console.log(err);
            }
        })

    // give the receipt's owner the specified reward points
    connection.query(`UPDATE users SET reward_points = reward_points + ?, monthly_total_points = monthly_total_points + ? WHERE user_id = ?`, [req.body.value * 100, req.body.value * 100, req.body.user_id], (err, results, fields) => {
        if (err) {
            console.log(err);
        }
    })

    res.send(true);
})

// delete receipt from database. Used by admin.html
app.post('/deleteReceipt', (req, res) => {
    connection.query(`DELETE FROM receipts WHERE receipt_id = ?`, [req.body.receipt_id], (err, results, fields) => {
        if (err) {
            console.log(err);
        } else {
            res.send(true);
        }
    })
})

// delete reward from database. Used by admin.html
app.post('/deleteReward', (req, res) => {
    // First delete any user_rewards belonging to the reward.
    connection.query(`DELETE FROM users_rewards WHERE reward_id = ?`, [req.body.reward_id], (err, results, fields) => {
        if (err) {
            console.log(err);
        } else {
            // Then delete the reward itself.
            connection.query(`DELETE FROM rewards WHERE reward_id = ?`, [req.body.reward_id], (err, results, fields) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send(true);
                }
            })
        }
    })
})

// redeem a reward: subtract from user's points and add reward to user's inventory. Used by rewards.html
app.post('/redeemReward', (req, res) => {
    // gets the number of points the user owns
    connection.query('SELECT reward_points FROM users WHERE user_id = ?', [req.session.uid], (err, results, fields) => {
        if (err) {
            console.log(err)
        } else if (results[0].reward_points < req.body.cost) {
            // failed redemption if user's reward points are insufficient
            res.send(false);
        } else {
            // add reward to user's inventory
            connection.query('INSERT INTO users_rewards (user_id, reward_id, redeemed_date) VALUES (?, ?, ?)',
                [req.session.uid, req.body.reward_id, req.body.redeemed_date], (err, results, fields) => {
                    if (err) {
                        console.log(err);
                    }
                })

            // subtract points from user's total reward points
            connection.query('UPDATE users SET reward_points = reward_points - ? WHERE user_id = ?', [req.body.cost, req.session.uid], (err, results, fields) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send(true);
                }
            })
        }
    })
})

// create a new reward as an admin. Used by new-reward.html
app.post('/createReward', (req, res) => {
    connection.query('INSERT INTO rewards (company, description, photo, value, points_cost) VALUES (?, ?, ?, ?, ?)',
        [req.body.company, req.body.description, req.body.photo, req.body.value, req.body.cost], (err, results, fields) => {
            if (err) {
                console.log(err);
            } else {
                res.send(true);
            }
        })
})

// gets all rewards a user owns as well as the rewards' details. Used by notification.html
app.get('/getUserRewards', (req, res) => {
    connection.query('SELECT * FROM users_rewards LEFT JOIN rewards ON users_rewards.reward_id = rewards.reward_id WHERE user_id = ? ORDER BY redeemed_date DESC;',
        [req.session.uid], (err, results, fields) => {
            if (err) {
                console.log(err);
            } else {
                res.send(results);
            }
        })
})

// updates signed in user's monthly goal points. Used by profile.html
app.post('/updateGoal', (req, res) => {
    connection.query('UPDATE users SET monthly_goal_points = ? WHERE user_id = ?', [req.body.goal, req.session.uid], (err, results, fields) => {
        if (err) {
            console.log(err);
        } else {
            res.send(true);
        }
    })
})

// gets the user's highscore for the quiz
app.get('/getHighscore', (req, res) => {
    if (req.session.uid == '' || req.session.uid == null) {
        res.send('signed out');
    } else {
        connection.query('SELECT quiz_highscore FROM users WHERE user_id = ?',
            [req.session.uid], (err, results, fields) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send(results);
                }
            })
    }
})

// gets the user's highscore for the quiz, and replaces it if the current score is greater
app.post('/compareHighscore', (req, res) => {
    if (req.session.uid == '' || req.session.uid == null) {
        res.send('signed out');
    } else {
        connection.query('SELECT quiz_highscore FROM users WHERE user_id = ?',
            [req.session.uid], (err, results, fields) => {
                if (err) {
                    console.log(err);
                } else {
                    let highscore = results[0].quiz_highscore;

                    if (highscore == null || req.body.score > highscore) {
                        replaceHighscore(req, req.body.score);
                        res.send('replaced');
                    } else {
                        res.send('not replaced');
                    }
                }
            })
    }

})

// replaces user's highscore with their current score
function replaceHighscore(req, replacementScore) {
    connection.query('UPDATE users SET quiz_highscore = ? WHERE user_id = ?',
        [replacementScore, req.session.uid], (err, results, fields) => {
            if (err) {
                console.log(err);
            } else {
                console.log(`Highscore is now ${replacementScore}`);
            }
        })
}

// Instead of using app.get() for every file, just use express.static middleware and it serves all required files to client for you.
app.use(express.static('./public'));

// sends the 404 page, used by the function below
app.get('/pageNotFound', (req, res) => {
    res.sendFile(`${__dirname}/public/not-found.html`);
})

// redirects to the 404 page for routes that don't exist
app.all('*', (req, res) => {
    res.redirect('/pageNotFound');
})