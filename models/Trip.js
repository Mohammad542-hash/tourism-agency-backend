const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  id: Number,
  destinationId: Number,
  title: String,
  city: String,
  image: String,
  description: String,
  price: String,
  duration: String
});

module.exports = mongoose.model("Trip", tripSchema);
