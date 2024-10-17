import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Role from './role'; // Import the Role model
import { StaffAttributes } from '../types/staff';

export class Staff extends Model<StaffAttributes> implements StaffAttributes {
  public id!: number;
  public first_name!: string;
  public last_name!: string;
  public email!: string;
  public phone!: string;
  public gender!: string;
  public alternate_number?: string;
  public roleId!: number;
  public designation!: string;
  public password!: string;
  public documents_collected!: { documentName: string; isOriginal: boolean }[]; // Array of documents
  public staff_id!: string; // Correctly defined as string
  public isVerified!: boolean;
  public address!: string;
  public city!: string;
  public state!: string;
  public country!: string;
  public postal_code!: string;
  public date_of_birth!: string;
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
      type: DataTypes.JSON, // Store documents in JSON format
      allowNull: false,
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
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postal_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_of_birth: {
      type: DataTypes.STRING,
      allowNull: false,
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
