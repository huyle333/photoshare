var express = require('express');
var router = express.Router();

module.exports = function(passport){
	/* GET register page. */
	router.get('/', function(req, res, next) {
	  res.render('register', { title: 'Register' });
	});

	router.get('/', passport.authenticate('register', {
		successRedirect: '/home',
		failureRedirect: '/signup',
		failureFlash: true
	}));

	return router;
}

// module.exports = router;