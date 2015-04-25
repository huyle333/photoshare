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

AlbumControl.get = function (album_id, callback) {
    var album = new AlbumModel({album_id: album_id});
}

AlbumControl.add = function(user, album, photo, callback) {
    PicturesC.add(pic, album, function(err, res) {
        if (err) {callback(err, null) }
        else { callback(null, res) }
    });
}

module.exports = AlbumControl;

