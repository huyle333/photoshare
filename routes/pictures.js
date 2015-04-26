var express = require('express');
var router = express.Router();

var PicturesC = require('../controllers/PicturesControl');
var UserC = require('../models/User');
var CommentC = require('../controllers/CommentControl');
var TagC = require('../controllers/TagControl');

var pictures = function(passport) {

    router.get('/:picture_id', function(req,res) {

        PicturesC.getPic(req.params.picture_id, function(err, pic) {
			if (err) {}
            else {
        		PicturesC.getComments(req.params.picture_id, function(err, comments) {
	        		album= req.params.albumId;
					console.log(comments);
	        		res.render('picture', {comment: comments, picture: pic, title: "picture", album: req.params.albumId});
    			})
            }
        });
    });

    router.post('/:picture_id/comment', function(req,res) {
        var commentData = {picture_id: req.params.picture_id, user_id: req.user[0][0].user_id, text: req.body.text};
        //var commentList = PicturesC.getComments(req.params.picture_id);

        //console.log(commentList);
        var userData = req.user[0][0];
        CommentC.create(req.user[0][0], commentData, function(err, callback) {
            if (err) { 
                res.redirect(
                    '/pic/' + callback.picture_id,  {
                        user: req.res.req.user[0][0], 
                        title: 'Picture', 
                        messages: req.flash('Error creating comment.')
                    });
            } else {
                res.redirect('/pic/' + callback.picture_id, { user: req.res.req.user[0][0], title: 'Picture'});
            }
        });
    });

    router.post('/:picture_id/tag', function (req, res) {
        TagC.create(req.params.picture_id, req.params.tag, function(err, callback) {
            if (err) {
                res.redirect(
                    '/pic/' + callback.picture_id, {
                        user: req.res.req.user[0][0],
                        title: 'Picture'
                    });
            } else {
                res.redirect('/pic/' + req.params.picture_id);
            }
        });
    });
        
    return router;
}

module.exports = pictures;
