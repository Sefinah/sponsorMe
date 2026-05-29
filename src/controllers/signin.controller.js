import { signinService } from "../services/signin.service.js"


export const signin = async (req, res) =>{
    const {email, password} = req.body
    try {
        if(!email || !password){
            return res.status(400).json({
                message: "all fields required"
            })
        }
        const result = await signinService({email, password})
        return res.status(200).json({
            message: 'signin successful',
            data: result
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'signin failed',
            error: error.message
        })
    }
}