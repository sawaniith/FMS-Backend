const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
app.use(cookieParser());
const dotenv = require('dotenv');
const path = require('path');

// const mongoose = require('mongoose');
dotenv.config({ path: './config.env' });
require('./data/coupons');
// const URI = process.env.DATABASE;
// mongoose.connect(URI, {useNewUrlParser: true}).then(() => console.log("MongoDB connected")).catch((err) => console.log(err));

//middlewares
app.use(express.json());
app.use(require('./routes/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server running......on ${PORT}`);
})