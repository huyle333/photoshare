"use strict";
var PicturesModel = require('../models/Pictures');
var db = require('../models/index');

function Album(data, user) {
    this.album_id = data.album_id;
    this.name = data.name;
    this.owner = user.owner;
    this.album_date = data.album_date;
}

Album.getPictures = function(album_id, callback) {
    db.query("SELECT imgdata, caption, picture_id, album FROM Pictures WHERE album=?",
            {replacements: [album_id]})
    .then(function(pictures) {
        pictures = pictures[0];
        var array = [];
        for (var i = 0; i < pictures.length; i++) {
            array.push(new PicturesModel(pictures[i]));
        }
        callback(null, array);
    })
    .catch(function(err) {
        callback(err, null);
    })
}

Album.create = function(album, callback) {
    var now = new Date();
    db.query("INSERT INTO Album (user_id, name, album_date) values ( ?,  ?, ?)", 
            {replacements: [album.owner, album.name, now],
            type: 'INSERT'})
    .then(function() {
        callback(null, album);
    });
}

Album.remove = function() {
    db.query ("DELETE FROM Album WHERE album_id = ?", 
            {replacements: [this.album_id], type: 'DELETE'});
}

module.exports = Album;
