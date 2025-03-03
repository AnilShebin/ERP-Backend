"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Staff = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const role_1 = __importDefault(require("./role")); // Import the Role model
class Staff extends sequelize_1.Model {
}
exports.Staff = Staff;
Staff.init({
    first_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    last_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        unique: true, // Added uniqueness to email
    },
    phone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    gender: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    alternate_number: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    roleId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
            model: role_1.default,
            key: 'id',
        },
    },
    designation: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    documents_collected: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: true,
    },
    staff_id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    isVerified: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    city: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    state: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    country: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    postal_code: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    date_of_birth: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize: database_1.default,
    modelName: 'Staff',
    tableName: 'staff',
    timestamps: true,
});
// Define relationship
Staff.belongsTo(role_1.default, { foreignKey: 'roleId', as: 'role' });
exports.default = Staff;
