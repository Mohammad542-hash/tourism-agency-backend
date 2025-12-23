const express = require('express');
const router = express.Router();
const controller = require('../controllers/tourController');
// routes/tourRoutes.js
// ...
const authController = require('../controllers/authController'); 

// ...

// CREATE (محمي)
router.post('/', authController.protect, controller.createTour);

// UPDATE (محمي)
router.put('/:id', authController.protect, controller.updateTour);
// ...
router.get('/:id', controller.getTourById);

// CREATE (الإضافة)
router.post('/', controller.createTour);

// UPDATE (التعديل)
router.put('/:id', controller.updateTour); // استخدام PUT لطلب التعديل الكامل
module.exports = router;
