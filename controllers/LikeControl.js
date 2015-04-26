var CommentModel = require('../models/Likes.js');

var LikeControl = function() {};

LikeControl.create = function(user, like, callback){
	like.user_id = user.user_id;
	CommentModel.create(like, function(err, res){
		if (err) { callback(err.message, null)}
		else { callback(null, res)}
	});
}

module.exports = LikeControl;