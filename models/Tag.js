"use strict";
var db = require('../models/index');

function Tag(data) {
    this.tag_id = data.tag_id;
    this.text = data.text;
}

Tag.create = function(text, callback)  {
    db.query("SELECT id FROM Tag WHERE text = ?",
            {replacements: [text]})
    .then(function(res) {
        if (res[0].length > 0){
            callback(null, res[0][0]);
            return;
        }
        else {
            db.query("INSERT INTO Tag (text) values (?) returning id", 
                {replacements: [text],
                    type:'INSERT'})
                .then(function(response) {
                    callback(null, response[0]);
                }).error(function() {
                    callback(err, null);
                });
        }
    });
}

Tag.link = function(tag_id, pictures_id, callback) {
    db.query("INSERT INTO PicturesTag (photo, tag) VALUES (?, ?)",
            {replacements: [pictures_id, tag_id], 
                type:'INSERT'})
        .then(function(res) {
            callback(null, res)
        }).error(function(res) {
            callback(null, res)
        });
}

module.exports = Tag;
