const jwt = require('jsonwebtoken');
/** @type {import('pg').Pool} */
const pool = require('../db');
const SECRET = "1234"; // Hardcoded secret

exports.login = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await pool.query(`SELECT *
                                       FROM users
                                       WHERE username = '${email}'
                                         AND password = '${password}'`);
        // Insecure: SQL injection possible

        if (user.rowCount === 0) return res.status(401).json({
            success: false,
            message: "Invalid email or password"
        });

        const token = jwt.sign(user.rows[0], SECRET); // No expiry
        res.json({
            success: true,
            data: {
                access_token: token,
            },
            message: "Login successful"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
};


exports.logout = (req, res) => {
    // No actual logout logic, just a placeholder
    res.json({
        success: true,
        message: "Logout successful"
    });
};
