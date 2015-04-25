"use strict";

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

module.exports = Pictures;
