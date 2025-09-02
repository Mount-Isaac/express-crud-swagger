import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || "Insecure--don'tusethiskeyonproduction1234@weaksecretkey"

export const protect = async(req,res,next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader){
        const err = new Error("Authorization token missing!");
        err.status = 401;
        return next(err)
    }
    console.log(`Cookies: ${req.cookies['csrftoken']}`)
    const token = authHeader.split(" ")[1] 
    if (!token){
        return res.status(401).json( { message: "Authorization token is missing!"} )
    }

    // decode token 
    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // add user info in request
        next();
    }catch(err){
        res.status(401).json({ message: "Invalid authorization token!"})
    }
}