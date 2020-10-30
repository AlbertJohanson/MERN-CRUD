const express = require('express');
const  dotenv = require('dotenv');
const morgan  = require('morgan');
const path = require('path');

dotenv.config();

const { mongoose } = require('./database');

const app = express();

//settings
app.set('port', process.env.PORT || 3000)
//Middlewares

app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use('/api/task' , require('./routes/task.routes'));
//Static Files

app.use(express.static(path.join(__dirname, 'public')));

//Server and Mongo DB connection
app.listen(app.get('port'), ()=>{
    console.log("Server on port 3000")
});