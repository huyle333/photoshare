"use strict";
var db = require('../models/index');

function Tag(data) {
    this.tag_id = data.tag_id;
    this.text = data.text;
}

Tag.create = function(text, callback)  {
    db.query("INSERT INTO Tag (text) values (?) returning id", 
            {replacements: [text],
                type:'INSERT'})
        .then(function(res) {
            callback(null, res[0]);
        }).error(function() {
            callback(err, null);
        });
}

Tag.link = function(tag_id, pictures_id, callback) {
    db.query("INSERT INTO PicturesTag (photo, tag) VALUES (?, ?)",
            {replacements: [pictures_id, tag_id], 
                type:'INSERT'})
        .then(function(res) {
            callback(null, res)
        });
}
