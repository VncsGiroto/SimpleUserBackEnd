import { User } from '../models/index.js'
import jwt from 'jsonwebtoken';

const authUserMiddleware = async (req,res,next) =>{
    try {
        const token = req.headers.authorization;
        if(!token){
            res.status(401)
                .json({ error: 'Faça Login'});
            return;
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({where:{id: decodedToken.id}});

        if(!user){
            res.status(401)
                .json({ error: 'Usuário Não Encontrado'});
            return;
        }

        req.userData = {
            id: user.id,
            email: user.email,
        }

        next();
    } catch (error) {
        if(error instanceof jwt.TokenExpiredError){
            res.status(401)
                .json({ error: 'Token Expirado. Faça Login Novamente'});
        }else{
            console.log(error);
            res.status(401)
                .json({ error: 'Autenticação Falhou'});
        }
    }
}

export default authUserMiddleware;