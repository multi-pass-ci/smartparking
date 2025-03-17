export const authToken = (req,res,next) => {
    const token = req.cookies ? req.cookies.token : null;
        
    if(!token) {
        return res.status(401).json({ message: "Token no autorizado"});
    }

    jwt.verify(token, TOKEN_SECRET, (err, user)=>{
        if(err) {
            return res.status(403).json({ message:'token invalido' })
        }

        req.user = user
        next();
    })
}