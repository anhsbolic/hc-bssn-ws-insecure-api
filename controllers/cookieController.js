const service = require('../services/cookieServices')

async function login(req, res) {
    try {
        const {accessToken, refreshToken} = await service.loginUser(req.body)

        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax',
            // sameSite: 'Strict',
            // sameSite: 'None',
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
            sameSite: 'Lax',
            // sameSite: 'Strict',
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
    try {
        const userId = req.userId
        const refreshToken = req.refreshToken

        const deleted = await service.logoutUser(userId, refreshToken)

        res.clearCookie('refresh_token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax',
            // sameSite: 'Strict'
        })

        if (!deleted) {
            return res.status(400).json({
                success: false,
                message: 'Refresh token tidak ditemukan atau sudah dihapus'
            })
        }

        res.json({
            success: true,
            message: 'Logout berhasil'
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }
}

async function getUserById(req, res) {
    try {
        const userId = req.userId
        const user = await service.getUserById(userId)

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }

        res.json({
            success: true,
            data: user,
            message: 'User retrieved successfully'
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }
}


module.exports = {
    login,
    refreshToken,
    logout,
    getUserById,
}
