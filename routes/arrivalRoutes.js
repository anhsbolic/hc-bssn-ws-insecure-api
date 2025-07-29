const express = require('express');
const router = express.Router();
const { createArrival, getArrivals, getArrivalById, approveArrival } = require('../controllers/arrivalController');
const auth = require('../middleware/auth');

router.post('/arrival', createArrival); // No auth check (insecure)
router.get('/arrival', getArrivals); // No auth check (insecure)
router.get('/arrival/:id', getArrivalById); // No auth check (insecure)
router.post('/approve/:id', auth, approveArrival); // Role check missing

module.exports = router;
