require('dotenv').config();
const express = require('express');
const dns = require('dns');
const cors = require('cors'); // Kept this one, removed the duplicate below
const app = express();
const connectDB = require("./db/db");
const cookieParse = require('cookie-parser');
const authRouter = require('./routers/auth.route');
const postRouter = require('./routers/post.route');

const allowedOrigins = [
  'https://social-media-frontend-delta-lac.vercel.app',
  'https://social-media-frontend-six-lake.vercel.app'  // ✅ already there?
];

app.options('*', cors()); // ✅ Handle preflight for all routes
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    const cleanOrigin = new URL(origin).origin;
    if (allowedOrigins.includes(cleanOrigin)) {
      return callback(null, true);
    } else {
      return callback(new Error(`CORS blocked: ${origin}`), false);
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
