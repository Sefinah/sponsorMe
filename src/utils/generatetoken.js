import jwt from 'jsonwebtoken'

export const generateToken = async (userId, role) => {
    const myJwtSecret = process.env.JWT_SECRET
    try {
        const payload = {
            user: {userId, role}
        }
        const token = jwt.sign(payload, myJwtSecret, {
            expiresIn: "24h"
        })
        return token
    } catch (error) {
        console.log(error)
        throw error
    }
}