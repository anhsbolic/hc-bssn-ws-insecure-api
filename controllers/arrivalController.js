/** @type {import('pg').Pool} */
const pool = require('../db');

exports.createArrival = async (req, res) => {
    const {
        full_name, passport_no, nationality, gender, birth_date, face_photo_url,
        phone_number, email, address_in_indonesia, flight_info,
        arrival_datetime, departure_city, destination_city, health_info,
        emergency_contact_name, emergency_contact_phone, vaccine_card_url
    } = req.body;

    console.log("PII:", req.body); // Insecure: log all PII

    try {
        // Insecure: raw SQL, no validation, no sanitization
        await pool.query(`
            INSERT INTO arrivals (full_name, passport_no, nationality, gender, birth_date, face_photo_url,
                                  phone_number, email, address_in_indonesia, flight_info,
                                  arrival_datetime, departure_city, destination_city, health_info,
                                  emergency_contact_name, emergency_contact_phone, vaccine_card_url)
            VALUES ('${full_name}', '${passport_no}', '${nationality}', '${gender}', '${birth_date}',
                    '${face_photo_url}', '${phone_number}', '${email}', '${address_in_indonesia}',
                    '${flight_info}', '${arrival_datetime}', '${departure_city}', '${destination_city}',
                    '${health_info}', '${emergency_contact_name}', '${emergency_contact_phone}',
                    '${vaccine_card_url}')
        `);

        res.status(201).send({
            success: true,
            message: "Arrival created successfully"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
};

exports.getArrivals = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM arrivals");
        res.json({
            success: true,
            data: result.rows,
            message: "list of Arrivals retrieved successfully"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
};

exports.getArrivalById = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await pool.query(`SELECT *
                                         FROM arrivals
                                         WHERE id = ${id}`); // No sanitization

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Arrival not found",
            });
        }

        res.json({
            success: true,
            data: result.rows[0],
            message: "Arrival retrieved successfully"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
};

exports.approveArrival = async (req, res) => {
    const id = req.params.id;
    const userId = req.user?.id || 0; // insecure: default 0
    const username = req.user?.username || 'unknown';

    try {
        await pool.query(`
            UPDATE arrivals
            SET status              = 'approved',
                approved_by_user_id = ${userId},
                approved_by_name    = '${username}',
                approved_at         = NOW()
            WHERE id = ${id}
        `);
        res.status(200).send({
            success: true,
            message: "Arrival approved successfully"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
};

exports.rejectArrival = async (req, res) => {
    const id = req.params.id;
    const userId = req.user?.id || 0;
    const username = req.user?.username || 'unknown';

    try {
        await pool.query(`
            UPDATE arrivals
            SET status              = 'rejected',
                rejected_by_user_id = ${userId},
                rejected_by_name    = '${username}',
                rejected_at         = NOW()
            WHERE id = ${id}
        `);
        res.status(200).send({
            success: true,
            message: "Arrival rejected successfully"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
};
