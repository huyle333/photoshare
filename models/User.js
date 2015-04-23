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
    this._user_id = data.id;
    this._token = data.token;
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
