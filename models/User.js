import { DataTypes } from "sequelize";
import { userDB } from '../db/db.js'

const User = userDB.define('User', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default User;