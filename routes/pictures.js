var express = require('express');
var router = express.Router();

var PicturesC = require('../controllers/PicturesControl');
var UserC = require('../models/User');
var CommentC = require('../controllers/CommentControl');
var TagC = require('../controllers/TagControl');
var LikeC = require('../controllers/LikeControl');

var pictures = function(passport) {

    router.get('/:picture_id', function(req,res) {
        // console.log(req.user[0][0].user_id);
        PicturesC.getPic(req.params.picture_id, function(err, pic) {
			if (err) {}
            else {
        		PicturesC.getComments(req.params.picture_id, function(err1, comments) {
                    if (err) {console.log(err2);}
                    else {
                        PicturesC.getTags(req.params.picture_id, function(err2, tags) {
                            if (err2) {
                                console.log(err3);
                            }
                            else {
                                album = req.params.albumId;
                                PicturesC.getLikes(req.params.picture_id, function(err3, likes) {
                                    PicturesC.getOwner(req.params.picture_id, function(err4, callback1){
                                        //console.log(callback1[0][0].user_id);
                                        if (typeof req.user === 'undefined'){
                                            res.render('picture', {owner: callback1[0][0], like: likes, comment: comments, picture: pic, title: "Picture", album: req.params.albumId, tags: tags});
                                        }else{
                                            res.render('picture', {owner: callback1[0][0], user: req.user[0][0], like: likes, comment: comments, picture: pic, title: "Picture", album: req.params.albumId, tags: tags});
                                        }
                                    });
                                });
                            }
                        });
                    }
                });
            }
        });
    });

    router.post('/:picture_id/comment', function(req,res) {
        if (typeof req.user === 'undefined'){
            var commentData = {picture_id: req.params.picture_id, user_id: 14, text: req.body.text};
            CommentC.createAnonymousComment(commentData, function(err, callback) {
            if (err) { 
                res.redirect(
                    '/pic/' + callback.picture_id,  {
                        user: commentData, 
                        title: 'Picture', 
                        messages: req.flash('Error creating comment.')
                    });
            } else {
                res.redirect('/pic/' + callback.picture_id, {user: commentData, title: 'Picture'});
            }
            });
        }else{
            var commentData = {picture_id: req.params.picture_id, user_id: req.user[0][0].user_id, text: req.body.text};
            PicturesC.getOwner(req.params.picture_id, function(err1, callback1){
                CommentC.create(req.user[0][0], commentData, function(err, callback) {
                console.log(callback1);
                if (err) { 
                    res.redirect(
                        '/pic/' + callback.picture_id,  {
                            owner: callback1[0][0],
                            user: req.res.req.user[0][0], 
                            title: 'Picture', 
                            messages: req.flash('Error creating comment.')
                        });
                } else {
                    res.redirect('/pic/' + callback.picture_id, {owner: callback1[0][0], user: req.res.req.user[0][0], title: 'Picture'});
                }
                });
            }); 
        }
        //var commentList = PicturesC.getComments(req.params.picture_id);

        // console.log(commentList);
        // var userData = req.user[0][0];
        
    });

    router.post('/:picture_id/tag', function (req, res) {
        TagC.create(req.params.picture_id, req.body.tag, function(err, callback) {
            if (err) {
                res.redirect(
                    '/pic/' + req.params.picture_id, {
                        user: req.res.req.user[0][0],
                        title: 'Picture'
                    });
            } else {
                res.redirect('/pic/' + req.params.picture_id);
            }
        });
    });
        
    router.post('/:picture_id/like', function(req,res) {
        var likeData = {picture_id: req.params.picture_id, user_id: req.user[0][0].user_id};
        //var likeList = PicturesC.getComments(req.params.picture_id);

        //console.log(likeList);
        var userData = req.user[0][0];
        LikeC.create(req.user[0][0], likeData, function(err, callback) {
            if (err) { 
                res.redirect(
                    '/pic/' + callback.picture_id,  {
                        user: req.res.req.user[0][0], 
                        title: 'Picture', 
                        messages: req.flash('Error creating like.')
                    });
            } else {
                res.redirect('/pic/' + callback.picture_id, { user: req.res.req.user[0][0], title: 'Picture'});
            }
        });
    });

    return router;
}

module.exports = pictures;
