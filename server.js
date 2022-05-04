// Constants used for node dependencies
const express = require('express');
const bodyparser = require("body-parser");
const bcrypt = require('bcrypt');
const app = express();


// You need this to be able to parse through the body of the post request
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
app.post('/postUserCredentials', (req, res) => {
    console.log(`Your email is: ${req.body.email}`);

    // Password hashing code using Bcrypt node dependency
    const saltRounds = 10;
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`Your password is: ${hash}`);
        }
    });
    
    res.send();
})

// Instead of using app.get() for every file, just use express.static middleware and it serves all required files to client for you.
app.use(express.static('./public'));