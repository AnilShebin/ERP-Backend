import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

export class Client extends Model {
  public id!: number;
  public clientType!: string;
  public firstName!: string;
  public middleName?: string;
  public lastName!: string;
  public businessName?: string;
  public companyName?: string;
  public groupName?: string;
  public dateOfIncorporation?: Date;
  public dateOfBusinessStarting?: Date;
  public cinNumber?: string;
  public panNumber!: string;
  public tanNumber?: string;
  public gstin?: string;
  public frn?: string;
  public registeredOfficeAddress!: string;
  public communicationAddress?: string;
  public city?: string;
  public state?: string;
  public pincode!: string;
  public mobileNo!: string;
  public alternateMobileNo?: string;
  public email!: string;
  public authorizedCapital?: number;
  public issuedCapital?: number;
  public paidUpCapital?: number;
  public bankDetails!: any[];
  public trustees?: any[];
  public partners?: any[];
  public members?: any[];
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Client.init(
  {
    clientType: {
      type: DataTypes.ENUM('Individual', 'PrivateLimitedCompany', 'LimitedCompany', 'Trust', 'LLP', 'PartnershipFirm', 'HUF'),
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    middleName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    businessName: {
      type: DataTypes.STRING,
    },
    companyName: {
      type: DataTypes.STRING,
    },
    groupName: {
      type: DataTypes.STRING,
    },
    dateOfIncorporation: {
      type: DataTypes.DATE,
    },
    dateOfBusinessStarting: {
      type: DataTypes.DATE,
    },
    cinNumber: {
      type: DataTypes.STRING,
    },
    panNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tanNumber: {
      type: DataTypes.STRING,
    },
    gstin: {
      type: DataTypes.STRING,
    },
    frn: {
      type: DataTypes.STRING,
    },
    registeredOfficeAddress: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    communicationAddress: {
      type: DataTypes.TEXT,
    },
    city: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING,
    },
    pincode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mobileNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alternateMobileNo: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    authorizedCapital: {
      type: DataTypes.DECIMAL(15, 2),
    },
    issuedCapital: {
      type: DataTypes.DECIMAL(15, 2),
    },
    paidUpCapital: {
      type: DataTypes.DECIMAL(15, 2),
    },
    bankDetails: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    trustees: {
      type: DataTypes.JSON,
    },
    partners: {
      type: DataTypes.JSON,
    },
    members: {
      type: DataTypes.JSON,
    },
  },
  {
    sequelize,
    modelName: 'Client',
    tableName: 'clients',
  }
);

export default Client;