import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Role from './role'; // Import the Role model

export interface StaffAttributes {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  alternate_number?: string;
  roleId: number; // Changed from role (string) to roleId (number)
  designation: string;
  password: string;
  documents_collected: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Staff extends Model<StaffAttributes> implements StaffAttributes {
  public id!: number;
  public first_name!: string;
  public last_name!: string;
  public email!: string;
  public phone!: string;
  public gender!: string;
  public alternate_number!: string;
  public roleId!: number; // Changed from role (string) to roleId (number)
  public designation!: string;
  public password!: string;
  public documents_collected!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize the Staff model
Staff.init(
  {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alternate_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    roleId: { // Added roleId as a foreign key
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Role,
        key: 'id',
      },
    },
    designation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    documents_collected: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'Staff',
    tableName: 'staff',
    timestamps: true, // Optional: Include timestamps
  }
);

// Establishing the association
Staff.belongsTo(Role, { foreignKey: 'roleId', as: 'role' });

export default Staff;
