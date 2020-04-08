"use strict";
exports.__esModule = true;
var dotenv = require("dotenv");
dotenv.config();
var config = {
    "development": {
        "username": "root",
        "password": process.env.DB_PASSWORD,
        "database": "react-nodebird",
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
    "test": {
        "username": "root",
        "password": process.env.DB_PASSWORD,
        "database": "react-nodebird",
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
    "production": {
        "username": "root",
        "password": process.env.DB_PASSWORD,
        "database": "react-nodebird",
        "host": "127.0.0.1",
        "dialect": "mysql"
    }
};
exports["default"] = config;
