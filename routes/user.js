var express = require('express');
var router = express.Router();
var UserController = require('../controllers/UserControl');

var user = function(passport) {

	router.post('/friend', function(req, res) {
		var friend = req.body.friend;
		UserController.addFriend(friend, function(err, response){
			if(!err){
				res.redirect('/success');
			}else{
				console.log(err);
				res.redirect('/login');
			}
		});	
	});

	router.get('/friends', function(req, res) {
	    res.render('friends', { title: 'friends', message: req.flash('registerMessage') });
		/*
	    UserController.getFriends(function(err, friends) {
	        if(!err) {
	            res.render('friends', {friends: friends});
	        } else {
	            res.redirect('/home');
	        }
	    });
		*/
	});

	router.get('/:user_id', function(req, res) {
	    var user_id = req.res.req.user[0][0].user_id;
	    UserController.getUserById(user_id, function(err, user) {
	        if(!err) {
	            res.render('user', {user: req.res.req.user[0][0], title: "User"});
	        } else {
	            //res.redirect('/error?type=viewUser');
	        }
	    })
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
