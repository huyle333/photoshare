"use strict";
var PicturesModel = require('../models/Pictures');
var db = require('../models/index');

function Album(data, user) {
    this.album_id = data.album_id;
    this.name = data.name;
    this.owner = user.owner;
    this.album_date = data.album_date;
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
Album.prototype.getPictures = function() {
    db.query("SELECT imgdata, caption, picture_id FROM Pictures WHERE album_id= ?",
            {replacements: [this.album_id]})
    .then(function(pictures) {
        var pictures = pictures[0];
        var array;
        for (pic in pictures) {
            array.push(new PicturesModel(pictures[pic]));
        }
        return array;
    })
}

module.exports = Album;
