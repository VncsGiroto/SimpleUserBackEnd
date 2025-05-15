import { User } from "../models/index.js";
import { checkInputValues } from "../validators/userValidator.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

class UserController {
    static async getAll(req, res) {
        try {
            const users = await User.findAll();
            res.status(200)
                .json(users);
        } catch (error) {
            res.status(500)
                .json({ error: 'Erro inesperado' });
        }
    }
    static async create(req,res){
        try {
            const { email, senha } = req.body;

            //validator
            await checkInputValues.validate(req.body);
            
            const IsUser = await User.findOne({where: {email},});
            if(IsUser){
                res.status(401)
                    .json({error: 'Email já cadastrado'});
                return;
            }

            const hashPassword = await bcrypt.hash(senha, Math.round(Math.random() * 2 + 10));
            const newUser = await User.create({
                email, 
                senha: hashPassword,
            });

            res.status(200)
                .json({
                    message: 'Usuario Criado',
                    id: newUser.id
                });
            
        } catch (error) {
            if(error.messages){
                res.status(400)
                    .json({error: error.messages});
            }
            else{
                res.status(500)
                    .json({ error: 'Erro inesperado' });
                    console.log(error);
            }
        }
    }
    static async login(req, res) {
        try {
            const { email, senha } = req.body;

            const IsUser = await User.findOne({where: {email},});

            if(!IsUser){
                res.status(401)
                    .json({error: 'Email Incorreto'});
                return;
            }

            const IsCorrectPassword = await bcrypt.compare(senha, IsUser.senha);

            if(!IsCorrectPassword){
                res.status(401)
                .json({error: 'Senha Incorreta'});
                return;
            }

            const token = jwt.sign({id: IsUser.id}, process.env.JWT_SECRET);

            res.status(200)
                .json({
                    message: 'Usuário Logado',
                    token
                });
        } catch (error) {
            res.status(500)
                .json({ error: 'Erro inesperado' });
            console.log(error)
        }
    }
    static async checkToken(req, res) {
        try {
            res.status(200)
                .json({
                    message: 'Token Válido',
                });
        } catch (error) {
            res.status(500)
                .json({ error: 'Erro inesperado' });
            console.log(error)
        }
    }
}

export default UserController;