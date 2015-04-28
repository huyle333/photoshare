var TagModel = require('../models/Tag.js');

var TagControl = function() {};

TagControl.create = function(picture_id, text, callback) {
    TagModel.create(text, function(err, success) {
        console.log(text);
        if (err) {callback(err, null)}
        else {
            TagModel.link(success.id, parseInt(picture_id), function(err, res) {
                if (err) {callback(err, null)}
                else { callback(null, res)}
            })
        }
    });
}

module.exports = TagControl;
