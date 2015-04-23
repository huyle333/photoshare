var LocalStrategy   = require('passport-local').Strategy;

var User            = require('../models/User');

module.exports = function(passport) {
    passport.seralizeUser(function(user, done)) {
        done(null, user);
    });

    passport.deseralizeUser(function(user, done)) {
        done(null, user);
    });

    passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {
        User.getUserCredential(email, password, function(err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false);
            }
            return done(null, user);

        });
    }));
}


