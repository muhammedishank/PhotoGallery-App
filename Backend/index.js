const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const app = express();
const connectDb = require('./config/db')
const helmet = require('helmet')
const morgan = require('morgan')

const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/post')

dotenv.config();

// middleware
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

// parse application/json
app.use(bodyParser.json())

app.use(helmet())
app.use(morgan("common"))

app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/post', postRoute)


app.listen(5000,()=>{ 
    console.log("Backend server is running!"); 
})