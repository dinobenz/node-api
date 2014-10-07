// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser');
var Bear       = require('./app/models/bear');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 9000; 		// set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); 				// get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:9000/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});

// more routes for our API will happen here

// on routes that end in /bears
// =============================================================================
router.route('/bears')
	// create a bear (access at POST http://localhost:9000/api/bears)
	.post(function(req, res) {
		res.json({ message: 'Bear created!' });
	})

	// get all the bears (access at GET http://localhost:9000/api/bears)
	.get(function(req, res) {
		var bears = Bear.getAll();
		res.json(bears);
	});

// on routes that end in /bears/:id
// =============================================================================
router.route('/bears/:id')
	// get the bear with that id (accessed at GET http://localhost:9000/api/bears/:id)
	.get(function(req, res) {
		var bear = Bear.get(req.params.id);
		if (bear != null) {
			return res.json(bear);
		} else {
			return res.send(204);
		}
	})

	// update the bear with that id (accessed at PUT http://localhost:9000/api/bears/:id)
	.put(function(req, res) {
		var bear = Bear.get(req.params.id);
		if (bear != null) {
			bear.name = req.body.name;
			Bear.update(bear);
			return res.send(200);
		} else {
			return res.send(204);
		}
	})

	// delete the bear with that id (accessed at DELETE http://localhost:9000/api/bears/:id)
	.delete(function(req, res) {
		var bear = Bear.get(req.params.id);
		if (bear != null) {
			Bear.delete(req.params.id);
			return res.send(200);
		} else {
			return res.send(204);
		}
	});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);