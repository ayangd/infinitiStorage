import { sequelize as sequelize_ } from './sequelize';
import initUser from './models/user';

export const sequelize = sequelize_;
export const User = initUser(sequelize_);
