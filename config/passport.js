"use strict";

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
    function(req, email, password, done) {
        console.log(req.body);
        var newUser = new UserModel(req.body);
        newUser.checkUserIDByEmail(newUser.email, function(err1, user1){
            if(err1){
                return done(err1);
            }
            if(typeof user1[0].user_id == null){
                // console.log(user1[0][0].user_id);
                console.log("Email has already been registered");
                done(null, false);
            }else{
                newUser.addUser(function(err2, user2) {
                    if (err2) {
                        // console.log(err);
                        return done(err2);
                    }
                    if (!user2) {
                        return done(null, false);
                    }
                    if (user2) {
                        return done(null, user2);
                    }
                });
            }
        });
    })
    );
}
