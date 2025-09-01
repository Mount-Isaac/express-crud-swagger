import { User } from "../models/user.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || "Insecure--don'tusethiskeyonproduction1234@weaksecretkey"

export const register = async(req,res,next) => {
    try{
        const {username, firstName, lastName, password} = req.body;
        const hashed = await bcrypt.hash(password, 10)
        const user = await User.create(
            { username, firstName, lastName, password:hashed}
        )
        res.status(201).json({ id:user.id, username:user.username, firstName:user.firstName, lastName:user.lastName })
    }catch(err){
        err.message = "username must be unique!";
        err.status = 400;
        next(err)
    }
}

export const login = async(req,res,next) => {
    try{
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } })
        if (!user){
            const err = new Error("Invalid login credentials");
            err.status = 401;
            return next(err);
        }
        const valid = await bcrypt.compare(password, user.password);
        if(!valid){
            const err = new Error("Invalid login credentials");
            err.status = 401;
            return next(err);
        }
        const token = jwt.sign(
            { id: user.id, username: user.username},
            JWT_SECRET,
            { expiresIn: "1h"}
        );
        res.status(200).json( {token} )

    }catch(err){
        next(err)
    }
}