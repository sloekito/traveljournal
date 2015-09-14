// Load required packages
var mongoose = require('mongoose');

// Define our location schema
var LocationSchema = new mongoose.Schema({
  city: String,
  desc: String,
  lat: Number,
  long: Number,
  userPictures: [{
        path: String,
        width: Number,
        height: Number
  }]
});

// We bind the Location model to the LocationSchema
module.exports = mongoose.model('Location', LocationSchema);