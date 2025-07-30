/** @type {import('pg').Pool} */
const pool = require('../db');

exports.addUser = async (req, res) => {
    const {email, password, role} = req.body;
    try {
        // Insecure: raw SQL, no validation, plaintext password
        await pool.query(`INSERT INTO users (username, password, role)
                          VALUES ('${email}', '${password}', '${role}')`);
        res.send({
            success: true,
            message: "User Added Successfully"
        });
    } catch (err) {
        res.status(500).send(err);
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
        res.status(500).send(err);
    }
};
