"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var sequelize_1 = require("sequelize");
var sequelize_2 = require("./sequelize");
var Comment = /** @class */ (function (_super) {
    __extends(Comment, _super);
    function Comment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Comment;
}(sequelize_1.Model));
Comment.init({
    content: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize: sequelize_2.sequelize,
    modelName: 'Comment',
    tableName: 'comment',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci'
});
exports.associate = function (db) {
};
exports["default"] = Comment;
