"use strict";

var db = require('../models/index');

function Album(data, user) {
    this.album_id = data.album_id;
    this.name = data.name;
    this.owner = user.owner;
    this.album_date = data.album_date;
}

Album.create = function(album, callback) {
    console.log(this);
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
