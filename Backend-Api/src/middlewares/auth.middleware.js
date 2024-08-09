import jwt from "jsonwebtoken"

const authenticate = (req,res,next) => {
    console.log("Cookies are: ",req.cookies.accessToken);
    
    const token = req.cookies.accessToken;

    if(!token){
        return res.status(401).json({message: "Access denied,no token provided"})
    }

    try {
        const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        res.status(400).json({message: "Invalid token"})
    }
}

export default authenticate