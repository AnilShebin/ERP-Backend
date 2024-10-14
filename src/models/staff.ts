// models/staff.ts
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
  roleId: number; 
  designation: string; 
  password: string; 
  documents_collected: boolean; 
  staff_id: string; // staff_id changed to string
  isVerified: boolean; 
  createdAt?: Date; 
  updatedAt?: Date; 
  role?: Role; // Keep this for role information
}

export class Staff extends Model<StaffAttributes> implements StaffAttributes {
  public id!: number;
  public first_name!: string;
  public last_name!: string;
  public email!: string;
  public phone!: string;
  public gender!: string;
  public alternate_number?: string; // Optional field
  public roleId!: number;
  public designation!: string;
  public password!: string;
  public documents_collected!: boolean;
  public staff_id!: string; // Correctly defined as string
  public isVerified!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

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
      unique: true, // Added uniqueness to email
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
    roleId: {
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
    staff_id: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'Staff',
    tableName: 'staff',
    timestamps: true,
  }
);

// Define relationship
Staff.belongsTo(Role, { foreignKey: 'roleId', as: 'role' });

export default Staff;
