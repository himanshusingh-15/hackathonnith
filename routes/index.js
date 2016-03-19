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
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		client.query('SELECT * FROM entry', function(err, result) {
			done();
			if (err)
				{ console.error(err); response.send("Error " + err); }
			else {
				console.log(result.rows);
			}
		});
	});

	res.render('index', { title: 'Express' });
});

module.exports = router;
