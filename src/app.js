require('dotenv').config();
const express = require('express');
const dns = require('dns');
const cors = require('cors'); // Kept this one, removed the duplicate below
const app = express();
const connectDB = require("./db/db");
const cookieParse = require('cookie-parser');
const authRouter = require('./routers/auth.route');
const postRouter = require('./routers/post.route');

// Ensure NO trailing slashes or paths in your allowed origins
const allowedOrigins = [
  'https://social-media-frontend-delta-lac.vercel.app',
  'https://social-media-frontend-six-lake.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, Postman, or curl)
    if (!origin) return callback(null, true);
    
    // Strip trailing slashes or paths from incoming origin if they exist for some reason
    const cleanOrigin = new URL(origin).origin;

    if (allowedOrigins.includes(cleanOrigin)) {
      return callback(null, true);
    } else {
      const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
      return callback(new Error(msg), false);
    }
  },
  credentials: true 
}));

app.use(express.json());
app.use(cookieParse());

dns.setServers([
    "1.1.1.1",
    "8.8.8.8"
]);

connectDB();

app.use('/api/v1/auth', authRouter);
app.use('/api/v2/post', postRouter);

module.exports = app;
