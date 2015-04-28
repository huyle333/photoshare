var express = require('express');
var router = express.Router();
var PicturesC = require('../controllers/PicturesControl');

var tag = function(passport) {
    
    router.get('/:tag_id', function (req, res) {
        PicturesC.getByTag(req.params.tag_id, function (err, pictures) {
            res.render('tag-display', {pic: pictures, title: "Tag", tags:req.params.tag_id});
        })
    });

    return router;
}

module.exports = tag;
