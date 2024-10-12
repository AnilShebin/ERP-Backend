import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import Role from './role';
import { UserAttributes, UserCreationAttributes } from '../types/user';

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public staff_id!: number;
  public password!: string;
  public phone!: string | null;
  public isVerified!: boolean;
  public roleId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public role?: Role;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    staff_id: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Role,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'staff',
    timestamps: true,
  }
);

User.belongsTo(Role, { foreignKey: 'roleId', as: 'role' });

export default User;