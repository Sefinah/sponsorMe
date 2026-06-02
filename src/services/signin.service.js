import { pool } from "../config/db.js"
import bcrypt from 'bcrypt'
import { generateToken } from "../utils/generatetoken.js"


export const signinService = async (data) =>{
    try {
        const userexist = await pool.query(`SELECT * FROM users WHERE email = $1`,
            [data.email])
            if ((userexist).rows.length == 0){
                throw new Error ('Invalid credentials')
            }
            console.log ('This is usereist response from database', userexist)
            const user = userexist.rows[0]
            const isMatch = await bcrypt.compare (data.password, user.password)
            if (!isMatch){
                throw new Error('Invalid credentials')
            }
            const token = await generateToken(user.id, user.role)
            console.log ('This is a generated token', token)
            return {
                user: {
                    id: user.id,
                    firstName: user.first_name,
                    lastName: user.last_name,
                    email: user.email,
                    role: user.role
                },
                token: token
            }
    } catch (error) {
        console.log(error)
        throw error
    }
}