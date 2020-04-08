"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
exports.__esModule = true;
var user_1 = require("./user");
var comment_1 = require("./comment");
var hashtag_1 = require("./hashtag");
var image_1 = require("./image");
var post_1 = require("./post");
__export(require("./sequelize"));
var db = {
    User: user_1["default"],
    Comment: comment_1["default"],
    Hashtag: hashtag_1["default"],
    Image: image_1["default"],
    Post: post_1["default"]
};
user_1.associate(db);
comment_1.associate(db);
hashtag_1.associate(db);
image_1.associate(db);
post_1.associate(db);
