var PicturesModel = require('../models/Pictures');

var PicturesControl = function() {};

PicturesControl.add = function(pic, album, callback) {
    pic.album_id = album.album_id;
    var newPic= new PicturesModel(photo);
    newPic.create(function() {
        callback(null, newPic);
    });
}
