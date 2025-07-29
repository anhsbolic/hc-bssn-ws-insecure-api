const jwt = require('jsonwebtoken');
const SECRET = "1234"; // Hardcoded secret (insecure)

module.exports = (req, res, next) => {
    const token = req.headers['authorization']?.replace('Bearer ', '');
    if (!token) return res.status(401).send('No token provided');
    try {
        // Insecure: no expiry check
        req.user = jwt.verify(token, SECRET, {ignoreExpiration: true});
        next();
    } catch (err) {
        res.status(401).send('Invalid token');
    }
};
