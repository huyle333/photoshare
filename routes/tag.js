var express = require('express');
var router = express.Router();
var PicturesC = require('../controllers/PicturesControl');

var tag = function(passport) {
    
    router.get('/search', function (req,res) {
        res.render('tag-search', {title: "Search by Tag"});
    });

    router.get('/:tag_id', function (req, res) {
        PicturesC.getByTag(req.params.tag_id, function (err, pictures) {
            res.render('tag-display', {pic: pictures, title: "Tag", tags:req.params.tag_id});
        })
    });

    router.post('/search', function(req, res) {
        PicturesC.getByTagBody(req.body.tag, function(err, pictures) {
            if (!err && pictures.length > 0) {
                res.render('tag-display', {pic:pictures, title:"Tag " + req.body.tag, tags:req.params.tag_id});
            } else {
                res.redirect('/home');
            }
        });
    });

    return router;
}

module.exports = tag;
