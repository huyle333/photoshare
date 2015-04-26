var TagModel = require('../models/Tag.js');

var TagControl = function() {};

TagControl.create = function(picture_id, text, callback) {
    TagModel.create(text, function(err, success) {
        if (err) {callback(err, null)}
        else {
            TagModel.link(success.text, picture_id, function(err, res) {
                if (err) {callback(err, null)}
                else { callback(null, res)}
            })
        }
    });
}

