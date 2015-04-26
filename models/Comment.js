"use strict";
var db = require('../models/index');

function Comment(data){
	this.comment_id = data.commment_id;
	this.picture_id = data.picture_id;
	this.user_id = data.user_id;
	this.text = data.text;
	this.comment_date = data.comment_date;
}

Comment.create = function(comment, callback){
	var now = new Date();
	db.query("INSERT INTO Comment (picture_id, user_id, text, comment_date) values (?, ?, ?, ?)", 
		{replacements: [comment.picture_id, comment.user_id, comment.text, comment.comment_date],
			type: 'INSERT'})
	.then(function() {
		callback(null, comment);
	});
}

Comment.getComments = function(picture_id){
	db.query("SELECT user_id, text, comment_date FROM Comment c, Pictures p WHERE p.picture_id = c.picture_id",
		{replacements: [picture_id]})
	.then(function(comments){
		var comments = comments[0];
		var array;
		for (comment in comments){
			array.push(new CommentsModel(comments[comment]));
		}
		console.log(array);
		return array;
	})
}