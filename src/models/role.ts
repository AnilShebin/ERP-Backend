// models/role.ts

import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Role extends Model {
    public id!: number;
    public name!: string;
    public code!: string;
}

Role.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        code: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
    },
    {
        sequelize,
        modelName: 'Role',
        tableName: 'roles',
        timestamps: true,
    }
);

export default Role;
