const jwt = require('jsonwebtoken');
const pool = require('../db');
const SECRET = "1234"; // Hardcoded secret

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await pool.query(`SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`);
        // Insecure: SQL injection possible

        if (user.rowCount === 0) return res.status(401).send("Invalid credentials");
        const token = jwt.sign({ id: user.rows[0].id, role: 'user' }, SECRET); // No expiry
        res.json({ token });
    } catch (err) {
        res.status(500).send(err);
    }
};
