const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../config");
const { User } = require("../db");

const authMiddleware = async(req, res, next) => {
    const { authorization } = req.headers
    if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(403).json({err: "Invalid token"});
    }
    const token = authorization.split(' ')[1]
    try{
        const isValidToken = jwt.verify(token, JWT_SECRET)
        const isUserExists = await User.findById(isValidToken.userId)
        if(!isUserExists)
        {
            res.status(404).json({err: "User does not exist!!"})
            return
        }
        req.userId = isValidToken.userId
        next()
    }
    catch(err){
        next(err)
        return
    }
}

module.exports = { authMiddleware }