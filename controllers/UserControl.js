var UserModel = require('../models/User.js');

var UserControl = function() {};

UserControl.addUser = function(data, callback){
    var User = new UserModel(data);
    User.create(function(err,res){
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

UserControl.addFriend = function(user_id, friend_id, callback){
	UserModel.addFriend(user_id, parseInt(friend_id), function(err, res){
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