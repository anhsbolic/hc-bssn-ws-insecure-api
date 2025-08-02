const {verifyAccessToken} = require('../utils/jwt')

function validateAccessToken(req, res, next) {
    const authHeader = req.headers['authorization']
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({message: 'Missing or invalid Authorization header'})
    }

    const token = authHeader.split(' ')[1]

    try {
        const payload = verifyAccessToken(token)
        req.userId = payload.id
        req.userRole = payload.role
        next()
    } catch (err) {
        return res.status(401).json({message: 'Invalid or expired access token'})
    }
}

module.exports = validateAccessToken
