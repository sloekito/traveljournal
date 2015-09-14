// Load required packages
var mongoose = require('mongoose');

// Define our location schema
var UserPictureSchema = new mongoose.Schema({

          path: String,
          width: Number,
          height: Number

});

// We bind the Location model to the LocationSchema
module.exports = mongoose.model('UserPicture', UserPictureSchema);