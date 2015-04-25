var express = require('express');
var router = express.Router();
var UserController = require('../controllers/UserControl');
var user = function(passport) {

	router.post('/:user_id/friend', function(req, res) {
		var user_id = req.res.req.user[0][0].user_id;
		var friend = req.params.user_id;
		console.log(friend);
		UserController.addFriend(user_id, friend, function(err, response){
			if(!err){
				res.redirect('/success', {title: "Success"});
			}else{
				console.log(err);
				res.redirect('/home');
			}
		});	
	});

	router.get('/friends', function(req, res) {
	    // res.render('friends', { title: 'friends', message: req.flash('registerMessage') });
		var user = req.res.req.user[0][0];
		console.log(user);
		var user_id = req.res.req.user[0][0].user_id;
		console.log(user_id);
	    UserController.getFriends(user_id, function(err, friends) {
	        if(!err) {
	            res.render('friends', {user: user, friends: friends[0], title: 'Friends'});
	        } else {
	        	console.log(err);
	            res.redirect('/home');
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

	router.post('/friend', function(req, res){
		var friend_id = req.res.req.friend[0][0].user_id;
		UserController.getFriend(friend_id, function(err, user){
			if(!err) {
	            res.redirect('/success', {title: "Success"});
	        } else {
	            res.redirect('/error?type=viewUser');
	        }
		});
	});

	return router;
}

module.exports = user;
