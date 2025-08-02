const jwt = require('jsonwebtoken')

function generateAccessToken(payload, expiresIn = '15m') {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }
    return jwt.sign(payload, secret, {expiresIn: expiresIn})
}

function verifyAccessToken(token) {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }
    return jwt.verify(token, secret)
}

module.exports = {
    generateAccessToken,
    verifyAccessToken,
}
