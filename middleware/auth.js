const jwt = require('jsonwebtoken');
const SECRET = "1234"; // Hardcoded secret (insecure)

module.exports = (req, res, next) => {
    const token = req.headers['authorization']?.replace('Bearer ', '');
    if (!token) {
        res.status(401).json({
            success: false,
            message: "Invalid token",
        })
    }

    try {
        // Insecure: no expiry check
        req.user = jwt.verify(token, SECRET, {ignoreExpiration: true});
        next();
    } catch (err) {
        res.status(401).json({
            success: false,
            message: "Invalid token",
        })
    }
};
