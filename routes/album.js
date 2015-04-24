var express = require('express');
var router = express.Router();
var AlbumC = require('../controllers/AlbumControl');
var UserC = require('../models/User');


var album = function(passport) {

    router.get('/', (function(req, res) {
        res.render('album',{ user: req.res.req.user[0][0], title: 'Album' });
    }));

    /* POST new album */
//    router.post('/new',isLoggedIn, function(req,res) {
    router.post('/', function(req,res) {
        var albumData = {owner: req.user[0][0].user_id, name :req.body.add_album};
        var userData = req.user[0][0];
        AlbumC.create(req.user[0][0], albumData, function(err, callback) {
            if (err) { 
                res.render(
                    'album',  {
                        user: req.res.req.user[0][0], 
                        title: 'Album', 
                        messages: req.flash('Error creating album.')
                    });
            } else {
                res.render('album', { user: req.res.req.user[0][0], title: 'Album'});
            }
        });
    });
    return router;
}
module.exports = album;
