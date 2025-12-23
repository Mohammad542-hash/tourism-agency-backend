const Tour = require('../models/Tour');

exports.getTourById = async (req, res) => {
    try {
        // إضافة populate لجلب بيانات الوجهة المرتبطة بـ destinationId
        const tour = await Tour.findById(req.params.id).populate('destinationId');
        if(!tour) return res.status(404).json({ message: 'Tour not found' });
        res.json(tour);
    } catch (err) {
        // تحسين معالجة الأخطاء للـ Invalid ID
        if (err.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid Tour ID format.' });
        }
        res.status(500).json({ error: err.message });
    }
};
// --- 1. إضافة رحلة جديدة (Create) ---
exports.createTour = async (req, res) => {
    try {
        const tour = new Tour(req.body);
        await tour.save();
        res.status(201).json(tour); // 201 Created
    } catch (err) {
        // غالباً ما يفشل بسبب 'destinationId' غير صالح أو مفقود
        if (err.name === 'ValidationError' || err.name === 'CastError') { 
            return res.status(400).json({ message: 'Invalid data or destinationId format' });
        }
        res.status(500).json({ error: err.message });
    }
};

// --- 2. تعديل رحلة موجودة (Update) ---
exports.updateTour = async (req, res) => {
    try {
        const tour = await Tour.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        ).populate('destinationId'); // يفضل عمل Populate لعرض البيانات المحدثة كاملة

        if (!tour) {
            return res.status(404).json({ message: 'Tour not found' });
        }
        res.status(200).json(tour);
    } catch (err) {
        if (err.name === 'ValidationError' || err.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid data or ID format' });
        }
        res.status(500).json({ error: err.message });
    }
};