var express = require('express');
var router = express.Router();
var UserController = require('../controllers/UserControl');

var user = function(passport) {

	router.post('/:user_id/friend', function(req, res) {
		var user_id = req.res.req.user[0][0].user_id;
		var friend = req.params.user_id;
		// console.log(friend);
		UserController.addFriend(user_id, friend, function(err, response){
			if(!err){
				res.redirect('/success');
			}else{
				console.log(err);
				res.redirect('/home');
			}
		});	
	});

	router.get('/friends', function(req, res) {
	    // res.render('friends', { title: 'friends', message: req.flash('registerMessage') });
		var user = req.res.req.user[0][0];
		// console.log(user);
		var user_id = req.res.req.user[0][0].user_id;
		// console.log(user_id);
	    UserController.getFriends(user_id, function(err, friends) {
	        if(!err) {
	            res.render('friends', {user: user, friends: friends[0], title: 'Friends'});
	        } else {
	        	// console.log(err);
	            res.redirect('/home');
	        }
	    });
	});

	router.get('/recommend', function(req, res) {
	    // res.render('friends', { title: 'friends', message: req.flash('registerMessage') });
		var user = req.res.req.user[0][0];
		// console.log(user);
		var email = req.res.req.user[0][0].email;
		// console.log(email);
		UserController.getTop5Pics(email, function(err, pics) {
		    UserController.getTop5Tags(email, function(err, tags) {
		        if(!err) {
		            res.render('recommend', {user: user, pics: pics[0], tags: tags[0], title: 'Recommend'});
		        } else {
		        	// console.log(err);
		            res.redirect('/home');
		        }
		    });
		});
	});

	router.get('/top', function(req, res) {
	    UserController.getTop10(function(err, response) {
	        if(!err) {
	            res.render('top', {response: response[0], title: 'Top'});
	        } else {
	        	// console.log(err);
	            res.redirect('/home');
	        }
	    });
	});

	router.get('/search', function(req, res) {
	    res.render('search', {title: 'Search'});
	});

	router.post('/search', function(req, res){
		var email = req.body.email;
		console.log(email);
		UserController.getIdByEmail(email, function(err, response) {
	        if(!err) {
	            res.redirect('/user/' + response[0][0].user_id);
	        } else {
	        	//console.log(response);
	        	res.redirect('/home');
	            //res.redirect('/error?type=viewUser');
	        }
	    });
	});

	router.get('/:user_id', function(req, res) {
		// console.log(req.params);
	    var user_id = req.params.user_id;
	    console.log(req.params);
	    UserController.getUserById(user_id, function(err, user) {
	        if(!err) {
	            res.render('user', {user: user[0][0], title: "User"});
	        } else {
	            //res.redirect('/error?type=viewUser');
	        }
	    });
	    /*
	    UserController.getByUsername(user_id, function(err, user) {
	        if(err) {
	            res.render(
                    'user',  {
                        user: req.res.req.user[0][0], 
                        title: 'UserID', 
                        messages: req.flash('Error creating UserID page.')
                    });
	        } else {
	            res.render('user', {user: req.res.req.user[0][0], title: 'UserID'});
	        }
	    });
		*/
	});



	return router;
}

module.exports = user;
