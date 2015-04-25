var PicturesModel = require('../models/Pictures');

var PicturesControl = function() {};

PicturesControl.add = function(pic, album, callback) {
    pic.album_id = album.album_id;
    var newPic= new PicturesModel(photo);
    newPic.create(function() {
        callback(null, newPic);
    });
}

PicturesControl.getPic = function(pic_id, callback) {
    PicturesModel.getById(pic_id, function(pi) {
        // get tag here
        callback(null, picture);
    })
}

module.exports = PicturesControl;
