require('dotenv').config();
const express = require('express')
const dns = require('dns')
const cors = require('cors') // 1. Import CORS package
const app = express()
const connectDB = require("./db/db");
const cookieParse = require('cookie-parser')
const authRouter = require('./routers/auth.route')
const postRouter = require('./routers/post.route')

app.use(cors({
    origin: 'http://localhost:5173', // Points to your Vite frontend port
    credentials: true                
}))

app.use(express.json())
app.use(cookieParse())

dns.setServers([
    "1.1.1.1",
    "8.8.8.8"
])

connectDB();

app.use('/api/v1/auth', authRouter)
app.use('/api/v2/post', postRouter)

module.exports = app;