
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

//  generated with refactoru-express generator
 app.get('/', function(req, res) {
 	res.render('index');
 });

mongoose.connect('mongodb://localhost/disney');

//part 2 question 5.  Setting up schema
var Applicant = mongoose.model('Applicant', {
	name: String,
	bio: String,
	skills: String,
	year: String,
	why: String
});



// displays a list of applicants
app.get('/applicants', function(req, res){
	
	// display data from database: PART: IV
		Applicant.find(function(error, data) {
			if (error)
				console.log('cannot read applicants');
			else
				res.render('applicants', {applicantData: data} );
		});
	

});

// creates and applicant
app.post('/applicant', function(req, res){
	// Here is where you need to get the data
	// from the post body and store it in the database
	console.log(req.body);
	res.render('./success');

	//store data from post body.
	var applicants = new Applicant ({
		name: req.body.name,
		bio: req.body.bio,
		skills: req.body.skills,
		year: req.body.year,
		why: req.body.why
	});
	applicants.save()
});

// app.get('/success', function(req, res) {
// 	res.render('/success')
// })

var server = app.listen(8441, function() {
	console.log('Express server listening on port ' + server.address().port);
});