const express = require('express');
const router = express.Router();
const controller = require('../controllers/contactController');

router.post('/', controller.addMessage);
router.get('/', controller.getMessages);

module.exports = router;
