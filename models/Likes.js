"use strict";
var db = require('../models/index');

function Likes(data){
	this.picture_id = data.picture_id;
	this.user_id = data.user_id;
}

Likes.create = function(likes, callback){
	db.query("INSERT INTO Likes (picture_id, user_id) values (?, ?)", 
		{replacements: [likes.picture_id, likes.user_id],
			type: 'INSERT'})
	.then(function() {
		callback(null, likes);
	});
}

module.exports = Likes;