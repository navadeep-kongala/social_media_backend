const jwt = require('jsonwebtoken');

const verifyJWT = async (req, res, next) => {
    try {
        // Reads the token directly from your cookies
        // Replace 'token' with the exact name you used when saving the cookie (e.g., 'jwt', 'authToken')
        const token = req.cookies.token; 
        
        if (!token) {
            return res.status(401).json({ 
                success: false, 
                message: "Access denied. No token provided." 
            });
        }

        // Verify the token using your secret key from .env
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user details from token payload to the request object
        req.user = decoded; 

        // Move to the next middleware or controller
        next(); 

    } catch (error) {
        return res.status(403).json({ 
            success: false, 
            message: "Invalid or expired token." 
        });
    }
};

module.exports = verifyJWT;
