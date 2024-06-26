import jwt from 'jsonwebtoken';


export const protect =(req,res,next)=>{
    const token = req.headers.authorization;
    if(!token){
        return res.status(401).json({
            success:false,
            message:"No token, authorization denied"
        })
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(err){
        res.status(401).json({
            success:false,
            message:"Token is not valid"
        })
    }
}


export const suerUser =(req,res,next)=>{
    const user = req.user;
    if(user.role!="superuser"){
        return res.status(401).json({
            success:false,
            message:"Not authorized as superuser"
        })
    }
    next();
}