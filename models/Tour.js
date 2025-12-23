const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    // ألغِ حقل id لكي تستخدم MongoDB's _id
    destinationId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Destination', 
        required: true 
    }, // الأهم: تحويله إلى ObjectId للربط
    title: { type: String, required: true },
    city: String,
    image: String,
    description: String,
    price: String,
    duration: String
});

module.exports = mongoose.model('Tour', tourSchema);