var UserModel = require('../models/User');

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

UserControl.getIdByEmail = function(email, callback){
    UserModel.getIdByEmail(email, function(err, res){
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

UserControl.getEmailById = function(id, callback){
    UserModel.getEmailById(id, function(err, res){
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

UserControl.getFriends = function(user_id, callback){
    UserModel.getFriends(user_id, function(err, res){
		if (err) {
        	callback(err.message, null);
            return;
        }else{
            callback(null, res);
            return;
        }
	});
}

UserControl.getTop10 = function(callback){
    UserModel.getTop10(function(err, res){
        if (err) {
            callback(err.message, null);
            return;
        }else{
            callback(null, res);
            return;
        }
    });
}

module.exports = UserControl;