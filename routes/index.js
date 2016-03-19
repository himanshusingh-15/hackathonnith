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
		if(err) {
			done();
			console.log(err);
		}
		console.log("Connected to postgres sql ...")
		client.query('INSERT INTO entry(rollno,name,emailid,phoneno,language,idea,suggestions) VALUES($1,$2,$3,$4,$5,$6,$7,', [rollno,name,emailid,phoneno,languageinterested,projectidea,suggestions]);

		var query = client.query("SELECT * FROM entry ORDER BY rollno ASC");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });

	});

	// res.render('index', { title: 'Express' });
});

module.exports = router;
