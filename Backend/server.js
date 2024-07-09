//BackEnd

const mongosee = require('mongoose')
const path = require('path')
require('dotenv').config()
const cors = require('cors')
const cookieParser = require('cookie-parser');

//

const dbConnect = require('./config/ConnectDB')

//


const express = require('express')
const app = express()

app.use(cookieParser())
dbConnect() // middleware para mag connect sa mongodb

app.use(express.json())

const allowedOrigins = [
    'http://localhost:7979',
    'https://notesifytalamo.onrender.com'
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

app.use('/api', require('./Routes/Routes'))
app.use('/postRoutes', require('./Routes/PostRoutes'))

const PORT = process.env.PORT || 6969
app.listen(PORT, () => console.log(`Connected to PORT ${PORT} Backend`))