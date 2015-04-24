var LocalStrategy   = require('passport-local').Strategy;
var User            = require('../models/User');

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

    passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {
        var response = User.getUserCredential(email, password, function(err, res) {
            // console.log(res[0][0].user_id);
            User.getUser(res[0][0].user_id, function(err, user) {
                // console.log(user);
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false);
                }
                if (user) {
                    return done(null, user);
                }
            })
        });

    })
    );

    passport.use('local-register', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, first_name, last_name, dob, gender, done) {
        first_name = req.body.first_name;
        last_name = req.body.last_name;
        dob = req.body.dob;
        gender = req.body.gender;
        var newUser = new User(email, password, first_name, last_name, dob, gender);
        
        newUser.addUser(function(err, user) {
            if (err) {
                console.log(err);
                return done(err);
            }
            if (!user) {
                return done(null, false);
            }
            if (user) {
                return done(null, user);
            }
        });
        /*
        User.addUser(email, password, first_name, last_name, dob, gender, function(err, user) {
            // console.log(user);
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false);
            }
            if (user) {
                return done(null, user);
            }
        });
        */
    })
    );

    passport.use('local-friend', new LocalStrategy({
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, friend_id, done) {
        console.log(req);
        var userData = req.body;
        // friend_id = req.body.user_id;
        var newUser = new User(req.body);
        
        newUser.addFriend(friend_id, function(err, user) {
            if (err) {
                console.log(err);
                return done(err);
            }
            if (!user) {
                return done(null, false);
            }
            if (user) {
                return done(null, user);
            }
        });
        /*
        User.addUser(email, password, first_name, last_name, dob, gender, function(err, user) {
            // console.log(user);
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false);
            }
            if (user) {
                return done(null, user);
            }
        });
        */
    })
    );
}


