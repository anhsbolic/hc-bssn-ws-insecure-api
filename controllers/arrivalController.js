/** @type {import('pg').Pool} */
const pool = require('../db');

exports.createArrival = async (req, res) => {
    const { fullname, passport_no, vaccine_card_url } = req.body;
    console.log("PII:", req.body); // Insecure: logs sensitive data

    try {
        // Insecure: no validation, SQL injection possible
        await pool.query(`INSERT INTO arrivals(fullname, passport_no, vaccine_card_url) 
                      VALUES ('${fullname}', '${passport_no}', '${vaccine_card_url}')`);
        res.send("Arrival created");
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.getArrivals = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM arrivals");
        res.json(result.rows);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.getArrivalById = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await pool.query(`SELECT * FROM arrivals WHERE id = ${id}`); // No sanitization
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.approveArrival = async (req, res) => {
    const id = req.params.id;
    // Insecure: no role check
    try {
        await pool.query(`UPDATE arrivals SET status='approved' WHERE id = ${id}`);
        res.send("Approved");
    } catch (err) {
        res.status(500).send(err);
    }
};
