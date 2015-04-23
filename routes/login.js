var express = require('express');
var router = express.Router();

module.exports = function(passport){
	/* GET login page. */
	router.get('/', function(req, res, next) {
	  res.render('login', { title: 'Login' });
	});

	router.post('/', passport.authenticate('login', {
		successRedirect:'/home',
		failureRedirect:'/login',
		failureFlash : true
	}));

	return router;
}

// module.exports = router;