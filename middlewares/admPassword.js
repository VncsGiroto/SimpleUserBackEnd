
const admPassword = async (req,res,next) =>{
    try {
        const SECRET_SERVER_ADM = req.headers.authorization;

        if(!SECRET_SERVER_ADM){
            res.status(401)
                .json({ error: 'Voce não tem acesso'});
            return;
        }
        if(SECRET_SERVER_ADM != process.env.SECRET_SERVER_ADM){
            res.status(401)
                .json({ error: 'Voce não tem acesso'});
            return;
        }

        next();
    } catch (error) {
        console.log(error);
        res.status(401);
    }
}

export default admPassword;