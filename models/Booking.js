const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema({
  name: String,
  phone: String,
  from: String,
  to: String,
 tourId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tour' },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Booking', bookingSchema);
