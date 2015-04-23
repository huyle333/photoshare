"use strict";

var db = require('index');

function Photo(data) {
    this.album_id = data.album_id;
    this.caption = data.caption;
    this.path = data.path;
    this.photo_id = data.photo_id;
}

Photo.prototype.create = function(next) {
    var photo = this;
    var insert = db.query("INSERT INTO PHOTOS (album_id, caption, path) VALUES (?, ?, ?)", 
            {replacements: [this.album_id, this.caption, this.path], type: 'INSERT'});
