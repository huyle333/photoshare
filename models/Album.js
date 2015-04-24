"use strict";

var db = require('index');

function Album(data, user) {
    this.album_id = data.album_id;
    this.name = data.name;
    this.owner = user.owner;
    this.album_date = data.album_date;
}

Album.prototype.create = function(callback) {
    var now = new Date();
    db.query = ("INSERT INTO Album (name, owner, album_date) where name = ?, owner = ?, album_date = ?", 
            {replacements: [this.name, this.owner, now]},
            type: 'INSERT')
    .then(function() {
        callback(null, album);
    });
}

