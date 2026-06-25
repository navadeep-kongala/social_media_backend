const jwt = require('jsonwebtoken');

const verifyJWT = async (req, res, next) => {
    try {
        // Read from Authorization header OR cookie
        let token = req.cookies.token;

        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ 
                success: false, 
                message: "Access denied. No token provided." 
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next(); 
    } catch (error) {
        return res.status(403).json({ 
            success: false, 
            message: "Invalid or expired token." 
        });
    }
};

module.exports = verifyJWT;
