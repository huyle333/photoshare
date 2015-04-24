var express = require('express');
var user = express.Router();
var UserController = ('../controllers/UserControl');

user.post('/friend', function(req, res) {
	console.log(req.body);
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

user.get('/friends', function(req, res) {
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

module.exports = user;
