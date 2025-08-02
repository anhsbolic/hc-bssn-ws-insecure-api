const express = require('express')
const controller = require('../controllers/cookieController')
const {authenticateToken} = require('../middleware/cookieMiddleware')

const router = express.Router()

router.post('/login', controller.login)
router.post('/refresh-token', controller.refreshToken)
router.post('/logout', controller.logout)
router.get('/private/data', authenticateToken, controller.privateData)

module.exports = router
