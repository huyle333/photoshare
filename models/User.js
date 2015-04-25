"use strict";
var db = require('../models/index');
var Sequelize = require('sequelize');

var email, password, first_name, last_name, dob, gender;

function User(data) {
    this.email = data.email;
    this.password = data.password;
    this.first_name = data.first_name;
    this.last_name = data.last_name;
    this.dob = data.dob;
    this.gender = data.gender;
    // this.location = data.location;
    this.user_id = data.user_id;
}

function User(email, password, first_name, last_name, dob, gender){
    this.email = email;
    this.password = password;
    this.first_name = first_name;
    this.last_name = last_name;
    this.dob = dob;
    this.gender = gender;
    // this.location = data.location;
    // this.user_id = data.user_id;
}

User.prototype.getId = function(callback) {
    db.query('SELECT user_id from Users WHERE email = ', this.email)
        .then(function(user_id) {
            callback(null, res);
        }).catch(function(err) {
            callback(new Error(err));
        });
}

User.prototype.addUser = function(callback) {
    /*
    db.query('INSERT INTO Users (email, password, first_name, last_name, dob, gender) VALUES (?, ?, ?, ?, to_date(?, \'MM DD YYYY\'), ?)', 
            {replacements: ['huyle333@bu.edu', 'test', 'Huy', 'Le', '01-14-1995', 'M'], type:'INSERT'})
    .then(function(res) {
        // console.log(res);
        callback(null, res);
    }).catch(function(err) {
        callback(new Error(err));
    });
    */
    var query = db.query('INSERT INTO Users (email, password, first_name, last_name, dob, gender) VALUES (?, ?, ?, ?, to_date(?, \'MM DD YYYY\'), ?)', 
            {replacements: [this.email, this.password, this.first_name, this.last_name, this.dob, this.gender], type:'INSERT'});
    return query;
}

User.prototype.addFriend = function(friend_id, callback) {
    var query = db.query('INSERT INTO Friends VALUES (?, ?)', {replacements: [this.user_id, friend_id]});
    return query;
}

User.prototype.getFriends = function(callback) {
    var query = db.query('SELECT u.email, u.first_name, u.last_name from Users u, Friends f where u.uid = f.friend_id and f.uid = ?', {replacements: [this.user_id]});
    return query;
}

User.getUser = function(id, callback) {
    console.log(this);
    db.query('SELECT email, password, first_name, last_name, dob, gender, user_id from Users WHERE user_id = ?', {replacements: [id]})
        .then(function(res) {
            console.log(res);
            callback(null, res);
        }).catch(function(err) {
            callback(new Error(err));
        });
}

User.getUserCredential = function(email, password, callback) {
    db.query('SELECT user_id FROM Users WHERE email = ? AND password = ?', 
            {replacements: [email, password]})
    .then(function(res) {
        // console.log(res);
        callback(null, res);
    }).catch(function(err) {
        callback(new Error(err));
    });
}

User.getAlbums = function(user_id, callback) {
    db.query('SELECT album_id, name FROM Album WHERE user_id = ?', 
            {replacements: [user_id]})
    .then(function(res) {
        callback(null,res);
    });
}

module.exports = User;
