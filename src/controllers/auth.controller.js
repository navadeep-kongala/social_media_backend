const mongoose = require('mongoose');
const UserModel = require('../models/user.model'); // Fixed typo: 'USerModel' to 'UserModel'
const jwt = require('jsonwebtoken')

async function registration(req, res) { // Added req and res parameters
    try {
        const { username, email, password } = req.body;

        // Pass the extracted variables into the create method
        const user = await UserModel.create({
            username,
            email,  
            password
        });

        const token =  jwt.sign({
            id:user._id
        },process.env.JWT_SECRET);

        res.cookie('token', token);
        return res.status(201).json({
        success: true,
        message: "User registered successfully",
        token: token,
        data: user
        });

    } catch (error) {
        // Handle errors (e.g., duplicate email, validation errors)
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
async function login(req, res) {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        // Check password (Note: Use bcrypt.compare() here if you hash your passwords)
        if (user.password !== password) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        // Generate token matching your registration format (using 'id')
        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET);

        // Set the cookie
        res.cookie('token', token);
        return res.status(200).json({
        success: true,
        message: "Logged in successfully",
       token: token,
        data: user
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = { registration, login };
