const express = require('express');
const cors = require('cors');

const PORT = 9090;

// *** importing routes *** //
const buyRoute = require('./Routes/buy_route');
const sellRoute = require('./Routes/sell_route');
const authRouter = require('./Routes/auth');

// *** importing connectDB function *** //
const connectDB = require('./dbConnect');

// *** connecting to mongoDb *** //
connectDB("mongodb+srv://dakshchawla2004:doctordaksh@cluster0.19je8.mongodb.net/PropertEase")
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

const app = express();

app.use(cors());
app.use(express.json())

app.use('/buy',buyRoute);
app.use('/sell',sellRoute);
app.use('/auth',authRouter);


app.listen(PORT, (err) => {
    if (err) {
        console.log("error connecting to server");
    } else {
        console.log(`connected to server at port ${PORT}`);
    }
})