const express = require('express');
const router = express.Router();
const {createArrival, getArrivals, getArrivalById, approveArrival} = require('../controllers/arrivalController');
const auth = require('../middleware/auth');

router.post('/arrivals', createArrival); // No auth check (insecure)
router.get('/arrivals', getArrivals); // No auth check (insecure)
router.get('/arrivals/:id', getArrivalById); // No auth check (insecure)
router.post('/arrivals/:id/approve', auth, approveArrival); // Role check missing


module.exports = router;
