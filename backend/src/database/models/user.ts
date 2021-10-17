import { INTEGER, Model, Optional, Sequelize, STRING } from 'sequelize';

export interface UserAttributes {
    id: number;
    password: string;
    email: string;
    firstName: string;
    lastName?: string;
    role: string;
}

export interface UserCreationAttributes
    extends Optional<UserAttributes, 'id'> {}

export class User
    extends Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes
{
    id!: number;
    password!: string;
    email!: string;
    firstName!: string;
    lastName!: string;
    role!: string;

    readonly createdAt!: Date;
    readonly updatedAt!: Date;
}

function initUser(sequelize: Sequelize) {
    return User.init(
        {
            id: {
                type: INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            password: {
                type: STRING,
                allowNull: false,
            },
            email: {
                type: STRING,
                allowNull: false,
                unique: true,
            },
            firstName: {
                type: STRING,
                allowNull: false,
            },
            lastName: {
                type: STRING,
                allowNull: true,
            },
            role: {
                type: STRING,
                allowNull: false,
            },
        },
        { tableName: 'users', sequelize }
    );
}

export default initUser;
