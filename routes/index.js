var express = require('express');
var router = express.Router();
var UserController = require('../controllers/UserControl');

module.exports = function(passport){
	/* GET index page. */
	router.get('/', function(req, res, next) {
	  res.render('index', { title: 'Flickr 2.0' });
	});

	/* GET home page. */
	router.get('/home', isLoggedIn, function(req, res, next) {
	  res.render('home', { body: req.res.req, title: 'Home' });
	});

	/* GET login page. */
	router.get('/login', function(req, res, next) {
	  res.render('login', { title: 'Login', message: req.flash('loginMessage') });
	});

	router.post('/login', passport.authenticate('local-login', {
		successRedirect:'/home',
		failureRedirect:'/login',
		failureFlash : true
	}));

	router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    /* GET register page. */
	router.get('/register', function(req, res, next) {
	  res.render('register', { title: 'Register', message: req.flash('registerMessage') });
	});

	router.post('/register', passport.authenticate('local-register', {
		successRedirect: '/login',
		failureRedirect: '/register',
		failureFlash: true
	}));

	router.get('/success', function(req, res) {
    	res.render('success', { title: 'Success' });
	});

    return router;
}


//module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}
