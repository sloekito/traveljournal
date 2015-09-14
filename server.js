// Load required packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Location = require('./models/location');
var UserPicture = require('./models/userpicture');
var router = express.Router();


// Connect to the traveljournal MongoDB
mongoose.connect('mongodb://localhost:27017/traveljournal');

// Create our Express application
var app = express();

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

// http://localhost:3000/api
router.get('/', function(req, res) {
  res.json({ message: 'Get' });
});


// We tell our app to use
// our router with the api prefix
app.use('/api', router);

var locationsRoute = router.route('/locations');

// Create endpoint /api/beers for GET
locationsRoute.get(function(req, res) {
  // Use the Location model to find all beer
  Location.find(function(err, locations) {
    if (err)
      res.send(err);

    res.json(locations);
  });
});


// Create endpoint /api/beers for POSTS
locationsRoute.post(function(req, res) {

  // Create a new instance of the Beer model
  var location = new Location();
  var userPictures = [];
  location.userPictures = [];

  // Set the properties that came from the POST data
  location.city = req.body.city;
  location.desc = req.body.desc;
  location.lat = req.body.lat;
  location.long = req.body.long;

	for (var i = 0, l = req.body.userPictures.length; i < l; i++) {

			var userPicture = new UserPicture();
	    var r = req.body.userPictures[i];

		userPicture.path = req.body.userPictures[i].path;
		userPicture.width = req.body.userPictures[i].width;
		userPicture.height = req.body.userPictures[i].height;

	    userPictures.push(userPicture);
		location.userPictures[i] = userPicture;

	}


  // Save the locations and check for errors
  location.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Location added!', data: location });
  });
});


// We start the server by listening to port 3000
app.listen(process.env.PORT || 3000);