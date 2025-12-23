const Destination = require('../models/Destination');
const Tour = require('../models/Tour');

exports.getDestinations = async (req, res) => {
  try {
    const data = await Destination.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDestinationById = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if(!destination) return res.status(404).json({ message: 'Not found' });
    res.json(destination);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getToursByDestination = async (req, res) => {
  try {
    const tours = await Tour.find({ destinationId: req.params.id });
    res.json(tours);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.createDestination = async (req, res) => {
    try {
        const destination = new Destination(req.body);
        await destination.save();
        res.status(201).json(destination); // 201 Created
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation failed', errors: err.errors });
        }
        res.status(500).json({ error: err.message });
    }
};

// --- 2. تعديل وجهة موجودة (Update) ---
exports.updateDestination = async (req, res) => {
    try {
        const destination = await Destination.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true } // new: true يعرض الكائن بعد التعديل، runValidators: لضمان تطبيق شروط الـ Schema
        );

        if (!destination) {
            return res.status(404).json({ message: 'Destination not found' });
        }
        res.status(200).json(destination);
    } catch (err) {
        if (err.name === 'ValidationError' || err.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid data or ID format' });
        }
        res.status(500).json({ error: err.message });
    }
};
