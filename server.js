const express = require('express');
const app = express();

app.listen(process.env.PORT || 3000, function (err) {
    if (err) {
        console.log(err);        
    }

})

app.get('/login', (req, res) => {
    console.log(`Your email is: ${req.body.email}`);
    console.log(`Your password is: ${req.body.password}`);
})

app.use(express.static('./public'));