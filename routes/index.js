var express = require('express');
var router = express.Router();
var pg = require('pg');
var path = require('path');

var check = false;

/* POST entry page. */
router.post('/', function(req, res, next) {
	var name = req.body.name;
	var rollno = req.body.rollno;
	var emailid = req.body.emailid;
	var phoneno = req.body.phoneno;
	var languageinterested = req.body.languageinterested;
	var projectidea = req.body.projectidea;
	var suggestions = req.body.suggestions;

	console.log(name);


	pg.defaults.ssl = true;
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		if(err) {
			console.log(err);
			done();
			res.sendFile(path.join(__dirname, '../views/error.html'));
		}
		else {
			console.log("Connected to postgres sql ...");
			client.query('SELECT emailid FROM entry where emailid=$1',[emailid],function(err,result){
				if(err) {
					return console.error('error running query', err);
				}
				console.log(result.rows[0]);
				var row = result.rows[0];
				if(row){
					check=true;
					res.render('viola', { title: 'Exists!' });
				}else{
					client.query('INSERT INTO entry(rollno,name,emailid,phoneno,language,idea,suggestions) VALUES($1,$2,$3,$4,$5,$6,$7)', [rollno,name,emailid,phoneno,languageinterested,projectidea,suggestions]);
					res.render('index', { title: 'NewEntry' });
				}
			});
		}
	});
});

module.exports = router;
