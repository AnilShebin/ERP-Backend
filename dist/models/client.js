"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HUF = exports.Partnership = exports.Trust = exports.Company = exports.Individual = exports.Client = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
// Base Client Model
class Client extends sequelize_1.Model {
}
exports.Client = Client;
Client.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    clientType: {
        type: sequelize_1.DataTypes.ENUM('Individual', 'PrivateLimitedCompany', 'LimitedCompany', 'Trust', 'LLP', 'PartnershipFirm', 'HUF'),
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
    },
    panNumber: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
    },
    gstin: {
        type: sequelize_1.DataTypes.STRING,
    },
    registeredOfficeAddress: {
        type: sequelize_1.DataTypes.STRING,
    },
    communicationAddress: {
        type: sequelize_1.DataTypes.STRING,
    },
    city: {
        type: sequelize_1.DataTypes.STRING,
    },
    state: {
        type: sequelize_1.DataTypes.STRING,
    },
    pincode: {
        type: sequelize_1.DataTypes.STRING,
    },
    mobileNo: {
        type: sequelize_1.DataTypes.STRING,
    },
    alternateMobileNo: {
        type: sequelize_1.DataTypes.STRING,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
    },
    bankDetails: {
        type: sequelize_1.DataTypes.TEXT,
    },
}, {
    sequelize: database_1.default,
    modelName: 'Client',
    tableName: 'clients',
});
// Individual Model
class Individual extends sequelize_1.Model {
}
exports.Individual = Individual;
Individual.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    clientId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: Client,
            key: 'id',
        },
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
    },
    middleName: {
        type: sequelize_1.DataTypes.STRING,
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
    },
    businessName: {
        type: sequelize_1.DataTypes.STRING,
    },
    dateOfBusinessStarting: {
        type: sequelize_1.DataTypes.STRING,
    },
    groupName: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    sequelize: database_1.default,
    modelName: 'Individual',
    tableName: 'individuals',
});
// Company Model
class Company extends sequelize_1.Model {
}
exports.Company = Company;
Company.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    clientId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: Client,
            key: 'id',
        },
    },
    companyType: {
        type: sequelize_1.DataTypes.ENUM('PrivateLimitedCompany', 'LimitedCompany'),
    },
    dateOfIncorporation: {
        type: sequelize_1.DataTypes.STRING,
    },
    cinNumber: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
    },
    tanNumber: {
        type: sequelize_1.DataTypes.STRING,
    },
    authorizedCapital: {
        type: sequelize_1.DataTypes.STRING,
    },
    issuedCapital: {
        type: sequelize_1.DataTypes.STRING,
    },
    paidUpCapital: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    sequelize: database_1.default,
    modelName: 'Company',
    tableName: 'companies',
});
// Trust Model
class Trust extends sequelize_1.Model {
}
exports.Trust = Trust;
Trust.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    clientId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: Client,
            key: 'id',
        },
    },
    dateOfIncorporation: {
        type: sequelize_1.DataTypes.STRING,
    },
    trustees: {
        type: sequelize_1.DataTypes.TEXT,
    },
}, {
    sequelize: database_1.default,
    modelName: 'Trust',
    tableName: 'trusts',
});
// Partnership Model
class Partnership extends sequelize_1.Model {
}
exports.Partnership = Partnership;
Partnership.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    clientId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: Client,
            key: 'id',
        },
    },
    partnershipType: {
        type: sequelize_1.DataTypes.ENUM('LLP', 'PartnershipFirm'),
    },
    dateOfIncorporation: {
        type: sequelize_1.DataTypes.STRING,
    },
    frn: {
        type: sequelize_1.DataTypes.STRING,
    },
    partners: {
        type: sequelize_1.DataTypes.TEXT,
    },
}, {
    sequelize: database_1.default,
    modelName: 'Partnership',
    tableName: 'partnerships',
});
// HUF Model
class HUF extends sequelize_1.Model {
}
exports.HUF = HUF;
HUF.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    clientId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: Client,
            key: 'id',
        },
    },
    dateOfIncorporation: {
        type: sequelize_1.DataTypes.STRING,
    },
    members: {
        type: sequelize_1.DataTypes.TEXT,
    },
}, {
    sequelize: database_1.default,
    modelName: 'HUF',
    tableName: 'hufs',
});
// Set up associations
Client.hasOne(Individual, { foreignKey: 'clientId', as: 'individual' });
Client.hasOne(Company, { foreignKey: 'clientId', as: 'company' });
Client.hasOne(Trust, { foreignKey: 'clientId', as: 'trust' });
Client.hasOne(Partnership, { foreignKey: 'clientId', as: 'partnership' });
Client.hasOne(HUF, { foreignKey: 'clientId', as: 'huf' });
Individual.belongsTo(Client, { foreignKey: 'clientId' });
Company.belongsTo(Client, { foreignKey: 'clientId' });
Trust.belongsTo(Client, { foreignKey: 'clientId' });
Partnership.belongsTo(Client, { foreignKey: 'clientId' });
HUF.belongsTo(Client, { foreignKey: 'clientId' });
exports.default = {
    Client,
    Individual,
    Company,
    Trust,
    Partnership,
    HUF,
};
