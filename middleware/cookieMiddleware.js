const {verifyAccessToken} = require('../utils/jwt')

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({message: 'No token'})
    }
    const token = authHeader.split(' ')[1]
    try {
        verifyAccessToken(token)
        next()
    } catch (err) {
        return res.status(401).json({message: 'Invalid token'})
    }
}

module.exports = {authenticateToken}
