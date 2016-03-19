var express = require('express');
var router = express.Router();
var pg = require('pg');

/* POST entry page. */
router.post('/', function(req, res, next) {
	var name = req.body.name;
	var rollno = req.body.rollno;
	var emailid = req.body.emailid;
	var phoneno = req.body.phoneno;
	var languageinterested = req.body.languageinterested;
	var projectidea = req.body.projectidea;
	var suggestions = req.body.suggestions;

	pg.defaults.ssl = true;
	pg.connect(process.env.DATABASE_URL, function(err, client) {
		if(err)
			throw err;
		console.log('Connected to postgres! Getting schemas...');

		client
		.query('SELECT table_schema,entry FROM information_schema.tables;')
		.on('row', function(row) {
			console.log(JSON.stringify(row));
		});
	});

	res.render('index', { title: 'Express' });
});

module.exports = router;
