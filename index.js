const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const authRoute = require('./routes/auth');
app.use('/auth', authRoute);

const userRoute = require('./routes/users');
app.use('/users', userRoute);

app.get('/', (req, res) => {
    res.status(200).json({ message : "Welcome to Bharat Go"});
});

app.use('*', (req, res) => {
    res.status(404).json({error : "Page not found"});
})

let PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Application is running on port : ", PORT);
})

module.exports = app;