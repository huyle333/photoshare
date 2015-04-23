"use strict";
var db = require('../models/index');

function User(data) {
    this.username = data.username;
    this.password = data.password;
    this.email = data.email;
    this.first_name = data.first_name;
    this.last_name = data.last_name;
    this.dob = data.dob;
    this.gender = data.gender;
    // this.location = data.location;
    this.user_id = data.id;
}

User.prototype.getId = function() {
    db.query('SELECT user_id from Users WHERE username = ', this.username)
        .then(function(uid) {
            return uid;
        });
}

User.prototype.addUser = function() {
    var query = db.query('INSERT INTO Users (username, password, email, first_name, last_name, dob, gender) VALUES (?, ?, ?, ?, ?, to_date(?, \'MM DD YYYY\'), ?)', 
            {replacements: [this.username, this.password, this.email, this.first_name, this.last_name, this.dob, this.gender ]});
    return query;
}

User.getUser = function() {
    db.query('SELECT username, password, email, fname, lname, dob, gender, location, id from Users WHERE id = ?', {replacements: [this.user_id]})
        .then(function(uid) {
            return uid;
        });
}
User.getUserCredential = function(email, password,callback) {
    db.query('SELECT email, password FROM Users WHERE email = ?', 
            {replacements: [email, password]})
    .then(function(response) {
        callback(response)
    }).catch(function(err) {
        callback(new Error(err));
    });
}

module.exports = User;
