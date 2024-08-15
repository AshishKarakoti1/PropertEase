const express = require('express');
const data = require('./data');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json())

app.get('/buy', (req, res) => {
    res.json(data);
})

app.listen(5555, (err) => {
    if (err) {
        console.log("error connecting to server");
    } else {
        console.log("connected to server at port 5555");
    }
})