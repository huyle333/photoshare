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
    // this.location = data.location;
    this.user_id = data.user_id;
}

User.prototype.getId = function(callback) {
    db.query('SELECT user_id from Users WHERE email = ', this.email)
        .then(function(user_id) {
            callback(null, res);
        }).catch(function(err) {
            callback(new Error(err));
        });
}

User.addUser = function(email, password, first_name, last_name, dob, gender, callback) {
    //db.query('INSERT INTO Users (email, password, first_name, last_name, dob, gender) VALUES (?, ?, ?, ?, to_date(?, \'MM DD YYYY\'), ?)', 
            //{replacements: [email, password, first_name, last_name, dob, gender], type:'INSERT'})
    db.query("INSERT INTO Users (email, password, first_name, last_name, dob, gender) VALUES ('huyle333', 'hello', 'Huy', 'Le', '01-14-1995', 'M')",{ raw: true})
    .then(function(res) {
        // console.log(res);
        callback(null, res);
    }).catch(function(err) {
        callback(new Error(err));
    });
}

User.getUser = function(id, callback) {
    db.query('SELECT email, password, first_name, last_name, dob, gender, user_id from Users WHERE user_id = ?', {replacements: [id]})
        .then(function(res) {
            // console.log(res);
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

module.exports = User;
