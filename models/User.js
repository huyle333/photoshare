"use strict";
var db = require('../models/index');
var Sequelize = require('sequelize');

function User(data) {
    this.email = data.email;
    this.password = data.password;
    this.first_name = data.first_name;
    this.last_name = data.last_name;
    this.dob = data.dob;
    this.gender = data.gender;

    this.current_city = data.current_city;
    this.current_state = data.current_state;
    this.current_country = data.current_country;

    this.hometown_city = data.hometown_city;
    this.hometown_state = data.hometown_state;
    this.hometown_country = data.hometown_country;

    this.education = data.education;

    this.user_id = data.user_id;
}

User.getIdByEmail = function(email, callback) {
    db.query('SELECT user_id from Users WHERE email = ?', {replacements: [email]})
        .then(function(res) {
            callback(null, res);
        }).catch(function(err) {
            callback(new Error(err));
        });
}

User.getEmailById = function(id, callback) {
    db.query('SELECT email from Users WHERE user_id = ?', {replacements: [id]})
        .then(function(res) {
            callback(null, res);
        }).catch(function(err) {
            callback(new Error(err));
        });
}

User.prototype.addUser = function(callback) {
    db.query('INSERT INTO Users (email, password, first_name, last_name, dob, gender, current_city, current_state, current_country, hometown_city, hometown_state, hometown_country, education) VALUES (?, ?, ?, ?, to_date(?, \'MM DD YYYY\'), ?, ?, ?, ?, ?, ?, ?, ?)', 
            {replacements: [this.email, this.password, this.first_name, this.last_name, this.dob, this.gender, this.current_city, this.current_state, this.current_country, this.hometown_city, this.hometown_state, this.hometown_country, this.education], type:'INSERT'})
        .then(function(res) {
            // console.log(res);
            callback(null, res);
        }).catch(function(err) {
            callback(new Error(err));
        });
}

User.addFriend = function(user_id, friend_id, callback) {
    // console.log(this.user_id);
    db.query('INSERT INTO Friends VALUES (?, ?)', {replacements: [user_id, friend_id]})
        .then(function(res) {
            callback(null, res);
        }).catch(function(err) {
            callback(new Error(err));
    });
}

User.getFriends = function(user_id, callback) {
    db.query('SELECT u.email, u.first_name, u.last_name, u.user_id from Users u, Friends f where u.user_id = f.friend_id and f.user_id = ?', {replacements: [user_id]})
        .then(function(res) {
            callback(null, res);
        }).catch(function(err) {
            callback(new Error(err));
    });
}

User.getUser = function(id, callback) {
    db.query('SELECT email, password, first_name, last_name, dob, gender, user_id from Users WHERE user_id = ?', {replacements: [id]})
        .then(function(res) {
            callback(null, res);
        }).catch(function(err) {
            callback(new Error(err));
    });
}

User.getUserCredential = function(email, password, callback) {
    db.query('SELECT user_id FROM Users WHERE email = ? AND password = ?', 
            {replacements: [email, password]})
    .then(function(res) {
        callback(null, res);
    }).catch(function(err) {
        callback(new Error(err));
    });
}

User.prototype.checkUserIDByEmail = function(email, callback) {
    db.query('SELECT user_id FROM Users WHERE email = ?', 
            {replacements: [email]})
    .then(function(res) {
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

User.getAllAlbums = function(callback) {
    db.query('SELECT album_id, name FROM Album', 
            {})
    .then(function(res) {
        callback(null,res);
    });
}

User.getTop10 = function(callback){
    db.query("SELECT results.email, SUM(results.total) as score FROM ((SELECT u.email, COUNT(*) as total FROM users u, pictures p, album a WHERE u.user_id = a.user_id AND a.album_id = p.album GROUP BY u.email ORDER BY total DESC) UNION ALL (SELECT u.email, COUNT(*) as total FROM users u, comment c WHERE u.user_id = c.user_id GROUP BY u.email ORDER BY total DESC)) as results WHERE results.email != 'ANONYMOUS' GROUP BY results.email ORDER BY score DESC LIMIT 10",
        {})
    .then(function(res) {
        callback(null,res);
    });
}

User.getTop5Tags = function(email, callback){
    db.query("SELECT PicturesTag.tag, t.text, COUNT(*) as total FROM Pictures p, Album a, Users u, Tag t INNER JOIN PicturesTag ON t.id = PicturesTag.tag WHERE u.user_id = a.user_id AND a.album_id = p.album AND p.picture_id = PicturesTag.photo AND u.email = ? GROUP BY PicturesTag.tag, t.text ORDER BY total DESC LIMIT 5",
        {replacements: [email]})
    .then(function(res) {
        callback(null,res);
    });
}

module.exports = User;
