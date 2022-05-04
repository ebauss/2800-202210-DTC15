const express = require('express');
const app = express();

app.listen(process.env.PORT || 3000, function (err) {
    if (err)
        console.log(err);
})

app.use(express.static('public'));