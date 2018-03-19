var express = require('express');
var db = require('../models');
var router = express.Router();
var passwordHash = require('password-hash');
var jwt = require('jsonwebtoken');

router.use(['/signin', '/signup'], json, function (req, res, next) {
	err = [];
	if (!req.body.email)
		err.push('missing email');
	
	if (!req.body.password)
		err.push('missing password');
	if (!err.length)
		next();
	else
		res.status(422).send(err);
});

// example of validating auth by token matching with user 
router.use('/logout', function (req, res, next) {

	err = []
	//if (req.is('application/json')) // return true if well set
	if (req.get('Authorization'))
		headerAuthorization = req.get('Authorization');
	else
		err.push('missing Authorization header');

	if (err.length)
		res.status(400).send(err); // check for missing header infos / auth
	else
		next();
});

router.post('/signin', function(req, res) {

	var hashedPassword = passwordHash.generate(req.body.password);
	db.User
		.findOrCreate({
			where: {
				email: req.body.email
			},
			defaults: {
				TeamId: req.body.teamId,
				password: hashedPassword
			}
		}).spread(function(user, created) {
			if (created) {
				res.status(200).send({user: user});
			}
			else
				res.status(409).send('email already used');
		});
});

router.get('/team', function(req,res,next) {

	db.User
	.find({
		where: {
			token: req.headers.authorization
		},
		include: [
			{ model: db.Team }
		]
	}).then(function(user) {
		team = user.Team;
		db.Team.
		findAll({ attributes: ['id', 'name', 'score'], include: [ { model: db.Goal } ]})
		.then(function(ennemys) {
			res.status(200).send({ennemy: ennemys});
		})
	})
});

router.post('/signup', function(req, res) {
	db.User
		.findOne({
			where: {
				email: req.body.email
			}
		}).then(function(user) { // check how to handle errors in promisses if (user) else ?

			if (user || passwordHash.verify(req.body.password, user.password))
			{
				var receivedUser = user.get({ plain: true }); //
				var token = jwt.sign('asdasd', user.email); // with server generated rsa
				//middleware that load user then re produce this logic allways good cause user cant change anything in our case
				user.token = token;
				user
					.save({
						fields: ['token'],
					}).then(function() {
						res.status(200).send({user: user});
					});
					//res.status(304).send('fail to persist token in database'); // fail to persist token in database
			}
			else
				res.status(401).send('incorrect password');
		});
});


router.post('/logout', function(req, res) { // check best get / post
	res.send('About birds');
});

module.exports = router;
