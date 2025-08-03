const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
    createArrival,
    getArrivals,
    getArrivalById,
    approveArrival,
    rejectArrival
} = require('../controllers/arrivalController');
const validateAccessToken = require('../middleware/validateAccessToken')


router.post('/arrivals', createArrival);
router.get('/arrivals', getArrivals);
router.get('/arrivals/:id', getArrivalById);
router.post('/arrivals/:id/approve', validateAccessToken, approveArrival);
router.post('/arrivals/:id/reject', validateAccessToken, rejectArrival);

module.exports = router;
