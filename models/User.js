"use strict";
var db = require('../models/index');

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

User.prototype.getId = function() {
    db.query('SELECT user_id from Users WHERE email = ', this.email)
        .then(function(user_id) {
            return user_id;
        });
}

User.prototype.addUser = function() {
    var query = db.query('INSERT INTO Users (email, password, first_name, last_name, dob, gender) VALUES (?, ?, ?, ?, to_date(?, \'MM DD YYYY\'), ?)', 
            {replacements: [this.email, this.password, this.first_name, this.last_name, this.dob, this.gender ], type:'INSERT'});
    return query;
}

User.getUser = function() {
    db.query('SELECT email, password, first_name, last_name, dob, gender, user_id from Users WHERE user_id = ?', {replacements: [this.user_id]})
        .then(function(user_id) {
            return user_id;
        });
}

User.getUserCredential = function(email, password, callback) {
    db.query('SELECT email, password FROM Users WHERE email = ?', 
            {replacements: [email, password]})
    .then(function(response) {
        callback(response);
    }).catch(function(err) {
        callback(new Error(err));
    });
}

module.exports = User;
