require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

const port = process.env.PORT || 5000
const MongoDB = process.env.MONGO_CNN

// MongoDB
mongoose
    .connect(MongoDB)
    .then(() => console.log('DB Connection Successfull!'))
    .catch((err) => {
        console.log(err);
    });


// CORS
app.use( cors() );

// BODY Parser
app.use( express.json() );

// Routes
app.use('/api/test', require('./routes/user'));
app.use('/', require('./routes/auth'));

app.listen(port, () => {
    console.log(`Server runing on port: ${port}`);
})