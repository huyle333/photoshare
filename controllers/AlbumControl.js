var AlbumModel = require('../models/Album.js');
var PicturesC = require('../controllers/PicturesControl');

var AlbumControl = function() {};

AlbumControl.create = function (user, album, callback) {
    album.owner = user.user_id;
    AlbumModel.create(album, function(err, res) {
        if (err) { callback(err.message, null)}
        else { callback(null, res)}
    });
}

AlbumControl.getPictures = function (album_id, callback) {
    var album = AlbumModel.getPictures(album_id);
}

AlbumControl.add = function(album, picture, callback) {
    PicturesC.add(picture, album, function(err, res) {
        if (err) {callback(err, null) }
        else { callback(null, res) }
    });
}

module.exports = AlbumControl;
