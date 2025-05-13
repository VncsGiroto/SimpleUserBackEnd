import { Sequelize } from "sequelize";

export const userDB = new Sequelize({
    dialect: 'sqlite',
    storage: './db/user.sqlite',
});