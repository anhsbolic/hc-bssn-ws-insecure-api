/** @type {import('pg').Pool} */
const pool = require('../db');

exports.addUser = async (req, res) => {
    const {email, password, name, role} = req.body;
    try {
        // Insecure: raw SQL, no validation, plaintext password
        await pool.query(`INSERT INTO users (username, password, name, role)
                          VALUES ('${email}', '${password}', '${name}', '${role}')`);

        res.status(201).json({
            success: true,
            message: "User Added Successfully"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
};

exports.listUsers = async (req, res) => {
    try {
        // Insecure: expose all users including passwords
        const result = await pool.query("SELECT * FROM users");
        res.json({
            success: true,
            data: result.rows,
            message: "Users retrieved successfully"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
};
