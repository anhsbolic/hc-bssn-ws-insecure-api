const service = require('../services/cookieServices')

async function login(req, res) {
    try {
        const {accessToken, refreshToken} = await service.loginUser(req.body)

        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'None',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        res.json({
            success: true,
            data: {
                access_token: accessToken
            },
            message: 'Login successful'
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}

async function refreshToken(req, res) {
    try {
        const userId = req.userId
        const oldToken = req.refreshToken

        const {accessToken, refreshToken} = await service.refreshAccessToken(userId, oldToken)

        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'None',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        res.json({
            success: true,
            data: {
                access_token: accessToken
            },
            message: 'Login successful'
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({success: false, message: 'Internal Server Error'})
    }
}

async function logout(req, res) {
    // const refreshToken = req.cookies.refresh_token
    // service.logoutUser(refreshToken)
    // res.clearCookie('refresh_token')
    // res.json({message: 'Logged out'})
}

async function privateData(req, res) {
    res.json({data: 'Private data OK'})
}

module.exports = {login, refreshToken, logout, privateData}
