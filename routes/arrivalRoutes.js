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


router.post('/arrivals', createArrival);
router.get('/arrivals', auth, getArrivals);
router.get('/arrivals/:id', auth, getArrivalById);
router.post('/arrivals/:id/approve', auth, approveArrival);
router.post('/arrivals/:id/reject', auth, rejectArrival);

module.exports = router;
