const express = require('express');
const router = express.Router();
const {addUser, listUsers} = require('../controllers/userController');

router.post('/users', addUser);
router.get('/users', listUsers); // optional, can be removed if too sensitive

module.exports = router;
