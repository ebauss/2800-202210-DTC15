const express = require('express');
const app = express();

// You need this to be able to parse through the body of the post request
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({
  extended: true
}));

app.listen(process.env.PORT || 3000, (err) => {
    if (err) {
        console.log(err);        
    }

})
// Route for POST request for postUserCredentials
app.post('/postUserCredentials', (req, res) => {
    console.log(`Your email is: ${req.body.email}`);
    console.log(`Your password is: ${req.body.password}`);
    res.send();
})

// Instead of using app.get() for every file, just use express.static middleware and it serves all required files to client for you.
app.use(express.static('./public'));