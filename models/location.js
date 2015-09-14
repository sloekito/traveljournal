// Load required packages
var mongoose = require('mongoose');

// Define our location schema
var LocationSchema = new mongoose.Schema({
  city: String,
  desc: String,
  lat: Number,
  long: Number,
  userPictures: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserPicture'

  }]
});

// We bind the Location model to the LocationSchema
module.exports = mongoose.model('Location', LocationSchema);