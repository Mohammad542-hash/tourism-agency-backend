const express = require('express');
const router = express.Router();
const controller = require('../controllers/destinationController');
const authController = require('../controllers/authController'); 

// ...

// CREATE (محمي)
router.post('/', authController.protect, controller.createDestination);

// UPDATE (محمي)
router.put('/:id', authController.protect, controller.updateDestination);
router.get('/', controller.getDestinations);
router.get('/:id', controller.getDestinationById);
router.get('/:id/tours', controller.getToursByDestination);
// CREATE (الإضافة)
router.post('/', controller.createDestination);

// UPDATE (التعديل)
router.put('/:id', controller.updateDestination); // استخدام PUT لطلب التعديل الكامل

module.exports = router;
