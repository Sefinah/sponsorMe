import jwt from 'jsonwebtoken'

export const generateToken = async (userId, role) => {
    const myJwtSecret = "gyiuwndgeun5678nuinbgtb"
    try {
        const payload = {
            user: {userId, role}
        }
        const token = jwt.sign(payload, myJwtSecret, {
            expiresIn: "24h"
        })
        return token
    } catch (error) {
        console.log
        return new Error ('jwt error')
    }
}