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
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return User;
}(sequelize_1.Model));
User.init({
    nickname: {
        type: sequelize_1.DataTypes.STRING(20)
    },
    userId: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false,
        unique: true
    },
    password: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    }
}, {
    sequelize: sequelize_2.sequelize,
    modelName: 'User',
    tableName: 'user',
    charset: 'utf8',
    collate: 'utf8_general_ci'
});
exports.associate = function (db) {
};
exports["default"] = User;
