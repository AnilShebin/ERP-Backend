// src/models/user.ts
import { DataTypes, Model } from 'sequelize'; // or mongoose
import sequelize from '../config/database';

export class User extends Model {
  public id!: number;
  public company_name!: string;
  public company_email!: string;
  public phone!: string;
  public password!: string;
  
  // timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  company_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  company_email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize, // passing the `sequelize` instance is required
  modelName: 'User',
});
