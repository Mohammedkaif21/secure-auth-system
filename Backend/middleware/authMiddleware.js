const jwt = require('jsonwebtoken');
require('dotenv').config()

const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log(req.headers['authorization']);
    console.log("Request Headers:", req.headers);
    console.log("Received Authorization header:", authHeader); 
    const token = authHeader?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access token missing' });
    }
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            console.log("JWT verification failed:", err.message);
            return res.status(403).json({ message: 'Invalid Access Token' })
        }
        console.log("Authenticated User:", user);
        req.user = user;
        next();
    })
}
module.exports = authenticate;