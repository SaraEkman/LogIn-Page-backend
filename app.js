const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
let host = '0.0.0.0';
var cookieParser = require('cookie-parser');
const logger = require('morgan')

const mongoose = require('mongoose');
const userRouter = require('./routes/user-route');
const adminRouter = require('./routes/admin-route');
const cors = require('cors');

app.use(cors());
app.use(logger('dev'))

app.use(express.json());
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/user', userRouter);
app.use('/admin', adminRouter);

const initAtlas = async () => {
    try {
        await mongoose.connect('mongodb+srv://sara:hel9514@mycluster.7osmm.mongodb.net/?retryWrites=true&w=majority');
        console.log('connected to database');
    } catch (err) { console.error('error', err); }
    app.listen(PORT, host, () => console.log(`Server is up and running on port: ${PORT}`));
};
initAtlas();