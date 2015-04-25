var LocalStrategy   = require('passport-local').Strategy;
var UserModel       = require('../models/User');

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
        var response = UserModel.getUserCredential(email, password, function(err, res) {
            // console.log(res[0][0].user_id);
            UserModel.getUser(res[0][0].user_id, function(err, user) {
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
    function(req, data, done) {
        console.log(req.body);
        var newUser = new UserModel(req.body);
        
        newUser.addUser(function(err, user) {
            if (err) {
                // console.log(err);
                return done(err);
            }
            if (!user) {
                return done(null, false);
            }
            if (user) {
                return done(null, user);
            }
        });
    })
    );
}