const express = require('express');
const cors = require('cors');

// *** importing routes *** //
const buyRoute = require('./Routes/buy_route');

const app = express();

app.use(cors());
app.use(express.json())

app.use('/buy',buyRoute);


app.listen(5555, (err) => {
    if (err) {
        console.log("error connecting to server");
    } else {
        console.log("connected to server at port 5555");
    }
})