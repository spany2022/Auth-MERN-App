
const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req, res, next) => {
    const authHeader = req.headers['authorization']; //get the token
    if (!authHeader) {
        return res.status(403).json({ message: "Unauthorized, JWT token is required" });
    }

    const token = authHeader.split(' ')[1]; // extract token from 'Bearer <token>'
    if (!token) {
        return res.status(403).json({ message: "Unauthorized, JWT token is required" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Unauthorized, JWT token is invalid or expired', error: error });
    }
}

module.exports = ensureAuthenticated;
