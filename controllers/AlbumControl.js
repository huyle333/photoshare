var AlbumModel = require('../models/Album.js');

var AlbumControl = function() {};

AlbumControl.create = function (user, album, callback) {
    album.owner = user.user_id;
    AlbumModel.create(album, function(err, res) {
        if (err) { callback(err.message, null)}
        else { callback(null, res)}
    });
}

module.exports = AlbumControl;

