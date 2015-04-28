"use strict";
var db = require('../models/index');

function Comment(data){
	this.comment_id = data.commment_id;
	this.picture_id = data.picture_id;
	this.user_id = data.user_id;
	this.email = data.email;
	this.text = data.text;
	this.comment_date = data.comment_date;
}

Comment.create = function(comment, callback){
	var now = new Date();
	db.query("INSERT INTO Comment (picture_id, user_id, text, comment_date) values (?, ?, ?, ?)", 
		{replacements: [comment.picture_id, comment.user_id, comment.text, now],
			type: 'INSERT'})
	.then(function() {
		callback(null, comment);
	});
}

Comment.createAnonymousComment = function(comment, callback){
	var now = new Date();
	db.query("INSERT INTO Comment (picture_id, user_id, text, comment_date) values (?, ?, ?, ?)", 
		{replacements: [comment.picture_id, comment.user_id, comment.text, now],
			type: 'INSERT'})
	.then(function() {
		callback(null, comment);
	});
}

module.exports = Comment;