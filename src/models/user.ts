import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import Role from './role';
import { UserAttributes, UserCreationAttributes } from '../types/user';

class User extends Model<UserAttributes, UserCreationAttributes> {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
    public isVerified!: boolean;
    public roleId!: number;
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
        email: {
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
        tableName: 'users',
        timestamps: true,
    }
);

User.belongsTo(Role, { foreignKey: 'roleId', as: 'role' });

export default User;
