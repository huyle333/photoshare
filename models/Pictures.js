"use strict";

var db = require('index');

function Pictures(data, album) {
    this.album_id = album.album_id;
    this.caption = data.caption;
    this.photo = data.photo;
    this.photo_id = data.photo_id;
}

Pictures.prototype.create = function(next) {
    db.query("INSERT INTO Pictures (album, caption, imgdata) VALUES (?, ?, ?)", 
            {replacements: [this.album_id, this.caption, this.photo], type: 'INSERT'})
    .then(function() {
        next();
    });
}
