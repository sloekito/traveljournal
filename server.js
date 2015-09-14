// Load required packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Location = require('./models/location');
//var UserPicture = require('./models/userpicture');
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

// Create endpoint /api/locations for GET
locationsRoute.get(function(req, res) {
  // Use the Location model to find all locations
  Location.find(function(err, locations) {
  	if (err)
  		res.send(err);

  	res.json(locations);
  });
});

// The UserPicture object
function UserPicture(path, width, height, id) {
	
	this.path = path;
	this.width = width;
	this.height = height;
	this.id = id;
}


// Create endpoint /api/locations for POSTS
locationsRoute.post(function(req, res) {

  // Create a new instance of the Location model
  var location = new Location();
  var userPictures = [];
  location.userPictures = [];

  // Set the properties that came from the POST data
  location.city = req.body.city;
  location.desc = req.body.desc;
  location.lat = req.body.lat;
  location.long = req.body.long;
  //location.userPictures = new Array();
  location.userPictures = [];

  // var userPictures = [];

  for (var i = 0, l = req.body.userPictures.length; i < l; i++) {

  	var userPicture = {
  		path: req.body.userPictures[i].path,
  		width: req.body.userPictures[i].width,
  		height: req.body.userPictures[i].height,
  	}

  	location.userPictures.push(userPicture);


  }
  // location.userPictures = userPictures;

  // Save the locations and check for errors	
  location.save(function(err) {
  	if (err)
  		res.send(err);

  	res.json({ message: 'Location added!', data: location });
  });
});

// New route for endpoint /api/locations/:id
var locationRoute = router.route('/locations/:id');

// Create endpoint /api/locations/:id for GET
locationRoute.get(function(req, res) {
  // Use the Location model to find a specific location
  Location.findById(req.params.id, function(err, location) {
  	if (err)
  		res.send(err);

  	res.json(location);
  });
});

// Create endpoint /api/location/:id for DELETE
locationRoute.delete(function(req, res) {
  // Use the Location model to find a specific location and remove it
  Location.findByIdAndRemove(req.params.id, function(err) {
  	if (err)
  		res.send(err);

  	res.json({ message: 'Location removed'});
  });
});


// We start the server by listening to port 3000
app.listen(process.env.PORT || 3000);