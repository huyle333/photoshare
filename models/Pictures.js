"use strict";

var db = require('../models/index');

function Pictures(data, album) {
    this.album_id = album.album_id;
    this.caption = data.caption;
    this.picture= data.picture;
    this.picture_id = data.picture_id;
}

Pictures.prototype.create = function(next) {
    db.query("INSERT INTO Pictures (album, caption, imgdata) VALUES (?, ?, ?)", 
            {replacements: [this.album_id, this.caption, this.photo], type: 'INSERT'})
    .then(function() {
        next();
    });
}
Pictures.getById = function(photo_id, callback) {
    db.query("SELECT picture_id, caption, imgdata, album FROM Pictures WHERE picture_id = ?",
            {replacements: [photo_id]})
    .then(function(pic) {
        var p = new Pictures(pic[0][0]);
        callback(null, p);
    }).catch(function(err) {
        callback(new Error(err));
    });
}

module.exports = Pictures;
