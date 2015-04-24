var AlbumModel = require('../models/Album.js');

var AlbumControl = function() {};

AlbumControl.create = function (user, album, picture, callback) {
    album.owner = user.user_id;
    var newAlbum = AlbumModel(album);
    newAlbum.create(function(err, req) {
        if (err) { callback(err.message, null)}
    });
}

module.exports = AlbumControl;
