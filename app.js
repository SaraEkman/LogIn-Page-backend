const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
let host = '0.0.0.0';

const mongoose = require('mongoose');
const userRouter = require('./routes/user-route');
const adminRouter = require('./routes/admin-route');
const cors = require('cors');

app.use(cors());

app.use(express.json());
app.use('/user', userRouter);
app.use('/admin', adminRouter);

app.get('/', (req, res) => {
    res.send('Välkommen');
});

const initAtlas = async () => {
    try {
        await mongoose.connect('mongodb+srv://sara:hel9514@mycluster.7osmm.mongodb.net/?retryWrites=true&w=majority');
        console.log('connected to database');
    } catch (err) { console.error('error', err); }
    app.listen(PORT, host, () => console.log(`Server is up and running on port: ${PORT}`));
};
initAtlas();