"use strict";
var db = require('index');

function User(data) {
    this.username = data.username;
    this.password = data.password;
    this.email = data.email;
    this.fname = data.fname;
    this.lname = data.lname;
    this.dob = data.dob;
    this.gender = data.gender;
    this.location = data.location;
    this.user_id = data.id;
}

User.prototype.getId = function() {
    db.query('SELECT user_id from Users WHERE username = ', this.username)
        .then(function(uid)) {
            return uid;
        }
}

User.prototype.addUser = function() {
    var query = db.query('INSERT INTO Users (username, password, email, first_name, last_name, dob, gender) VALUES (uname, passwd, emails, fname, lname, dateofbirth, genders)', 
            {replacements: [uname: this.username, passwd: this.password, emails: this.email, fname: this.fname, lname: this.lname, dateofbirth: this.dob, genders: this.gender ]});
    return query;
}

User.getUser = function() {
    db.query('SELECT username, password, email, fname, lname, dob, gender, location, id from Users WHERE id = ?', {replacements: [this.user_id]})
        .then(function(uid)) {
            return uid;
        }
}
User.getUserCredential = function(email, password) {
    db.query('SELECT email, password WHERE id = ?', 
            {replacements: [email, password]})
        .then(function(uid)) {
            return uid;
        }
}

module.exports = User;
