var UserModel = require('../models/User.js');

var UserControl = function() {};

UserControl.getUserById = function(user_id, callback){
    UserModel.getUser(user_id, function(err, res){
        if(err){
            callback(err.message, null);
            return;
        }
        else {
            callback(null,res);
            return;
        }
    });
}

UserControl.addFriend = function(friend_id, callback){
	var User = new UserModel(user);
	User.addFriend(parseInt(friend_id), function(err, response){
		if (err) {
        	return done(err);
        }
        if (!response) {
        	return done(null, false);
        }
        if (response) {
            return done(null, response);
        }
	});
}

UserControl.getFriends = function(user, callback){
	var User = new UserModel(user);
	User.getFriends(function(err, response){
		if (err) {
        	return done(err);
        }
        if (!response) {
        	return done(null, false);
        }
        if (response) {
            return done(null, response);
        }
	});
}

module.exports = UserControl;
