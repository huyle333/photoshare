var PicturesModel = require('../models/Pictures');
var CommentC = require('../controllers/CommentControl');

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

PicturesControl.getTags = function(pic_id, callback) {
    PicturesModel.getTag(pic_id, function(err, res) {
        if (err) { callback(err, null) }
        else { callback(null, res) }
    });
}
PicturesControl.getComments = function(picture_id, callback){
	PicturesModel.getComments(picture_id, function(err, res) {
        callback(null, res);
    });
}


module.exports = PicturesControl;
