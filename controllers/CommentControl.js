var CommentModel = require('../models/Comment.js');

var CommentModel = function() {};

CommentControl.create = function(user, comment, callback){
	comment.user_id = user.user_id;
	CommentModel.create(comment, function(err, res){
		if (err) { callback(err.message, null)}
		else { callback(null, res)}
	});
}