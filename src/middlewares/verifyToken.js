import jwt from 'jsonwebtoken'

export const verifyToken = async (req, res, next) =>{
    const secret = "gyiuwndgeun5678nuinbgtb"
    try {
        const authorization = req.headers.authorization
        if(!authorization){
            return res.status(400).json({
                message: "No authorization header"
            })
        }
        const token = authorization.split(" ")[1]
        if (!token){
            return res.status(400).json({
                message: 'Token not found'
            })
        }
        const decodeToken = jwt.verify(token,secret)
        req.user = decodeToken.user
        next()
    } catch (error) {
        throw error
    }
}