var express = require('express');
var router = express.Router();
var AlbumC = require('../controllers/AlbumControl');
var UserC = require('../models/User');


var album = function(passport) {

    router.get('/', (function(req, res) {
        var user = req.res.req.user[0][0];
        UserC.getAlbums(user.user_id, function(err, albums) {
            res.render('album',{ user: user, albums: albums[0], title: 'Album' });
        })
    }));

    /* POST new album */
//    router.post('/new',isLoggedIn, function(req,res) {
    router.post('/', function(req,res) {
        var albumData = {owner: req.user[0][0].user_id, name :req.body.add_album};
        var albumList = UserC.getAlbums(req.user[0][0].user_id);

        console.log(albumList);
        var userData = req.user[0][0];
        AlbumC.create(req.user[0][0], albumData, function(err, callback) {
            if (err) { 
                res.redirect(
                    '/album',  {
                        user: req.res.req.user[0][0], 
                        title: 'Album', 
                        messages: req.flash('Error creating album.')
                    });
            } else {
                res.redirect('/album', { user: req.res.req.user[0][0], title: 'Album'});
            }
        });
    });
    router.get('/:albumId', function(req, res) {
        AlbumC.getPictures(req.params.albumId, function(err, pictures) {
            var album = {};
            album.pictures = pictures;
            res.render('album-display', {album: album});
        })
    });

    router.post('/add', function(req, res) {
        var album = {album_id: req.body.album}
        var pic = {caption: req.body.caption, picture: req.files.pic.path.substring(7)}
        AlbumC.add(album, pic, function(err, response) {
            console.log(response);
            if (err) { res.redirect('/')}
            else { res.redirect('/pic/'+ response)}
        });
    });

    return router;
}
module.exports = album;
