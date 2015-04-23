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
            console.log(res[0][0].user_id);
            User.getUser(res[0][0].user_id, function(err, user) {
                console.log(user);
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
}


