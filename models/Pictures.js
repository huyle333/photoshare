"use strict";
var CommentModel = require('../models/Comment');
var db = require('../models/index');

function Pictures(data) {
    this.album_id =data.album;
    this.caption = data.caption;
    this.imgdata= data.imgdata;
    this.picture_id = data.picture_id;
}

Pictures.prototype.create = function(next) {
    db.query("INSERT INTO Pictures (album, caption, imgdata) VALUES (?, ?, ?)", 
            {replacements: [this.album_id, this.caption, this.photo], type: 'INSERT'})
    .then(function() {
        next();
    });
}
Pictures.create = function(pic, callback) {
    db.query("INSERT INTO Pictures (album, caption, imgdata) VALUES (?, ?, ?)",
            {replacements: [pic.album_id, pic.caption, pic.picture], type: 'INSERT'})
    .then(function() {
        db.query("SELECT picture_id from Pictures WHERE imgdata=?",
                {replacements: [pic.picture]})
        .then(function(pic) {
            callback(null, pic[0][0].picture_id);
        }).catch(function(err) {
            callback(new Error(err));
        });
    });
}
Pictures.getById = function(photo_id, callback) {
    db.query("SELECT picture_id, caption, imgdata, album FROM Pictures WHERE picture_id = ?",
            {replacements: [photo_id]})
    .then(function(pic) {
        var p = pic[0][0];
        callback(null, p);
    }).catch(function(err) {
        callback(new Error(err));
    });
}
Pictures.getTag = function(picture_id, callback) {
    db.query("SELECT text,id FROM tag INNER JOIN PicturesTag ON tag.id=picturestag.tag WHERE photo=?",
            {replacements: [picture_id]})
    .then(function(tags) {
        callback(null, tags[0]);
    }).catch(function(err) {
        callbacK(new Error(err));
    });
}

Pictures.getByTag = function(tag_id, callback) {
    db.query("SELECT picture_id, imgdata, caption, picture_id, album FROM Pictures INNER JOIN PicturesTag ON photo=picture_id WHERE tag=?",
            {replacements: [tag_id]})
    .then(function(pictures) {
        callback(null, pictures[0]);
    })
    .catch(function(err) {
        callback(err, null);
    })
}

//comment.picture_id
Pictures.getComments = function(picture_id, callback){
    db.query("SELECT Users.user_id, email, text, comment_date FROM Comment c INNER JOIN Users ON c.user_id = Users.user_id WHERE c.picture_id = ?",
        {replacements: [picture_id]})
    .then(function(comments){
        comments = comments[0];
        var array = [];
        for (var i = 0; i < comments.length; i++) {
            array.push(new CommentModel(comments[i]));
        }
        callback(null, array);
    })
    .catch(function(err) {
        callback(err, null);
    })
}

//likes.picture_id
Pictures.getLikes = function(picture_id, callback){
    db.query("SELECT Users.user_id, email FROM Likes l INNER JOIN Users ON l.user_id = Users.user_id WHERE l.picture_id = ?",
        {replacements: [picture_id]})
    .then(function(likes){
        likes = likes[0];
        var array = [];
        for (var i = 0; i < likes.length; i++) {
            array.push(new CommentModel(likes[i]));
        }
        callback(null, array);
    })
    .catch(function(err) {
        callback(err, null);
    })
}


module.exports = Pictures;
