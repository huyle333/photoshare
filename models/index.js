"use strict";

var fs          = require("fs");
var path        = require("path");
var Sequelize   = require("sequelize");
var env         = process.env.NODE_ENV || "development";
var config      = require("../config");
var sequelize   = new Sequelize(
        config.db.name, 
        config.db.username, 
        config.db.password,
        config.db.env
        );

function db() {}

db.query = function(query, params) {
    var query = sequelize.query(query, params);
    return query;
}

db.chain = function(queries) {
    var chain = new Sequelize.Utils.QueryChainer();
    for (q in queries) {
        chain.add(sequelize.query(queries[q].string, queries[q].rep));
    }
    return chain;
}

module.exports = db;

