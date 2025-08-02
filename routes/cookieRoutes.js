const express = require('express')
const controller = require('../controllers/cookieController')
const validateAccessToken = require('../middleware/validateAccessToken')
const validateRefreshToken = require('../middleware/validateRefreshToken')

const router = express.Router()

router.post('/login', controller.login)
router.post('/refresh-token', validateRefreshToken, controller.refreshToken)
router.post('/logout', validateRefreshToken, controller.logout)
router.get('/me', validateAccessToken, controller.getUserById)

module.exports = router
