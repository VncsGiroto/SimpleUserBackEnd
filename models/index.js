import { userDB } from '../db/db.js';
import User from './User.js';

userDB.sync({ force: false })
    .then(() => {
        console.log('Models sincronizados com o banco');
    })
    .catch((err) => {
        console.error('Erro:', err);
});

export { User};