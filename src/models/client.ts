import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

// Base Client Model
export class Client extends Model {
  public id!: number;
  public clientType!: string;
  public name!: string;
  public panNumber!: string;
  public gstin?: string;
  public registeredOfficeAddress!: string;
  public communicationAddress?: string;
  public city?: string;
  public state?: string;
  public pincode!: string;
  public mobileNo!: string;
  public alternateMobileNo?: string;
  public email!: string;
  public bankDetails!: string;
}

Client.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    clientType: {
      type: DataTypes.ENUM('Individual', 'PrivateLimitedCompany', 'LimitedCompany', 'Trust', 'LLP', 'PartnershipFirm', 'HUF'),
    },
    name: {
      type: DataTypes.STRING,
    },
    panNumber: {
      type: DataTypes.STRING,
      unique: true,
    },
    gstin: {
      type: DataTypes.STRING,
    },
    registeredOfficeAddress: {
      type: DataTypes.STRING,
    },
    communicationAddress: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING,
    },
    pincode: {
      type: DataTypes.STRING,
    },
    mobileNo: {
      type: DataTypes.STRING,
    },
    alternateMobileNo: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    bankDetails: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    modelName: 'Client',
    tableName: 'clients',
  }
);

// Individual Model
export class Individual extends Model {
  public id!: number;
  public clientId!: number;
  public firstName!: string;
  public middleName?: string;
  public lastName!: string;
  public businessName?: string;
  public dateOfBusinessStarting?: string;
  public groupName?: string;
}

Individual.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    clientId: {
      type: DataTypes.INTEGER,
      references: {
        model: Client,
        key: 'id',
      },
    },
    firstName: {
      type: DataTypes.STRING,
    },
    middleName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    businessName: {
      type: DataTypes.STRING,
    },
    dateOfBusinessStarting: {
      type: DataTypes.STRING,
    },
    groupName: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'Individual',
    tableName: 'individuals',
  }
);

// Company Model
export class Company extends Model {
  public id!: number;
  public clientId!: number;
  public companyType!: 'PrivateLimitedCompany' | 'LimitedCompany';
  public dateOfIncorporation!: string;
  public cinNumber!: string;
  public tanNumber?: string;
  public authorizedCapital?: string;
  public issuedCapital?: string;
  public paidUpCapital?: string;
}

Company.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    clientId: {
      type: DataTypes.INTEGER,
      references: {
        model: Client,
        key: 'id',
      },
    },
    companyType: {
      type: DataTypes.ENUM('PrivateLimitedCompany', 'LimitedCompany'),
    },
    dateOfIncorporation: {
      type: DataTypes.STRING,
    },
    cinNumber: {
      type: DataTypes.STRING,
      unique: true,
    },
    tanNumber: {
      type: DataTypes.STRING,
    },
    authorizedCapital: {
      type: DataTypes.STRING,
    },
    issuedCapital: {
      type: DataTypes.STRING,
    },
    paidUpCapital: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'Company',
    tableName: 'companies',
  }
);

// Trust Model
export class Trust extends Model {
  public id!: number;
  public clientId!: number;
  public dateOfIncorporation!: string;
  public trustees!: string;
}

Trust.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    clientId: {
      type: DataTypes.INTEGER,
      references: {
        model: Client,
        key: 'id',
      },
    },
    dateOfIncorporation: {
      type: DataTypes.STRING,
    },
    trustees: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    modelName: 'Trust',
    tableName: 'trusts',
  }
);

// Partnership Model
export class Partnership extends Model {
  public id!: number;
  public clientId!: number;
  public partnershipType!: 'LLP' | 'PartnershipFirm';
  public dateOfIncorporation!: string;
  public frn?: string;
  public partners!: string;
}

Partnership.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    clientId: {
      type: DataTypes.INTEGER,
      references: {
        model: Client,
        key: 'id',
      },
    },
    partnershipType: {
      type: DataTypes.ENUM('LLP', 'PartnershipFirm'),
    },
    dateOfIncorporation: {
      type: DataTypes.STRING,
    },
    frn: {
      type: DataTypes.STRING,
    },
    partners: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    modelName: 'Partnership',
    tableName: 'partnerships',
  }
);

// HUF Model
export class HUF extends Model {
  public id!: number;
  public clientId!: number;
  public dateOfIncorporation!: string;
  public members!: string;
}

HUF.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    clientId: {
      type: DataTypes.INTEGER,
      references: {
        model: Client,
        key: 'id',
      },
    },
    dateOfIncorporation: {
      type: DataTypes.STRING,
    },
    members: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    modelName: 'HUF',
    tableName: 'hufs',
  }
);

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

export interface ClientData {
  id?: number;
  clientType: 'Individual' | 'PrivateLimitedCompany' | 'LimitedCompany' | 'Trust' | 'LLP' | 'PartnershipFirm' | 'HUF';
  name: string;
  panNumber: string;
  gstin?: string;
  registeredOfficeAddress: string;
  communicationAddress?: string;
  city?: string;
  state?: string;
  pincode: string;
  mobileNo: string;
  alternateMobileNo?: string;
  email: string;
  bankDetails: string;
  individual?: {
    firstName: string;
    middleName?: string;
    lastName: string;
    businessName?: string;
    dateOfBusinessStarting?: string;
    groupName?: string;
  };
  company?: {
    companyType: 'PrivateLimitedCompany' | 'LimitedCompany';
    dateOfIncorporation: string;
    cinNumber: string;
    tanNumber?: string;
    authorizedCapital?: string;
    issuedCapital?: string;
    paidUpCapital?: string;
  };
  trust?: {
    dateOfIncorporation: string;
    trustees: string;
  };
  partnership?: {
    partnershipType: 'LLP' | 'PartnershipFirm';
    dateOfIncorporation: string;
    frn?: string;
    partners: string;
  };
  huf?: {
    dateOfIncorporation: string;
    members: string;
  };
  [key: string]: any;
}

export default {
  Client,
  Individual,
  Company,
  Trust,
  Partnership,
  HUF,
};