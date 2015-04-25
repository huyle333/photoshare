var PicturesModel = require('../models/Pictures');

var PicturesControl = function() {};

PicturesControl.add = function(pic, album, callback) {
    pic.album_id = album.album_id;
    PicturesModel.create(pic, function(err, newPic) {
        if (err) { callback(err)}
        callback(null, newPic);
    });
}

PicturesControl.getPic = function(pic_id, callback) {
    PicturesModel.getById(pic_id, function(err, picture) {
        // get tag here
        callback(null, picture);
    })
}

module.exports = PicturesControl;
