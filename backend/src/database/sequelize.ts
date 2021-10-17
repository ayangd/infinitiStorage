import { Sequelize } from 'sequelize';

if (!process.env.DATABASE_CONNECTION) {
    throw new Error('No database specified in env. Please specify one.');
}

export const sequelize = new Sequelize(process.env.DATABASE_CONNECTION);
