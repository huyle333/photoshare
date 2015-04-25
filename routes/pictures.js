var express = require('express');
var router = express.Router();

var PicturesC = require('../controllers/PicturesControl');

var pictures = function(passport) {

    router.get('/:picture_id', function(req,res) {
        PicturesC.getPic(req.params.picture_id, function(err, pic) {
            if (err) {}
            else { res.render('picture', { picture: pic, title: "Picture"})}
        });
    });
    return router;
}

module.exports = pictures;
