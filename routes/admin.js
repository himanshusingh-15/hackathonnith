var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');

/* GET admin. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views/admin.html'));
});

router.post('/', function(req, res, next) {
	var username = req.body.username;
	var password = req.body.password;
	console.log(username);
	console.log(password);

	pg.defaults.ssl = true;
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		if(err) {
			done();
			console.log(err);
			res.sendFile(path.join(__dirname, '../views/error.html'));
		}
		else {
			console.log("Connected to postgres sql in list...");
			client.query('SELECT count(*) FROM admin where username=$1 and password=$2',[username,password],function(err,result){
				if(err) {
					console.error('error running query', err);
					res.sendFile(path.join(__dirname, '../views/error.html'));
				}
				else {
					console.log(result.rows[0]);
					var row = result.rows[0];
					if(row.count != 0){
						console.log("sending rows data of students");
						client.query('SELECT * FROM entry',function(err,result) {
							if(err) {
								console.error('error running query', err);
								res.sendFile(path.join(__dirname, '../views/error.html'));
							}
							else {
								console.log("Result from the entry");
								console.log(result.rows[0].name);
								// res.sendFile(path.join(__dirname, '../views/about.html'));
								// res.render('list', { data: result });
								res.render('list', { title: 'Students List', data: result.rows });
							}
						});
					}else{
						res.redirect('/admin');
					}
				}
			});
		}
	});
});

module.exports = router;
