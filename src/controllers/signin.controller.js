import { signinService } from "../services/signin.service.js"
import { sendResponse } from "../utils/sendresponse.js"


export const signin = async (req, res) =>{
    const {email, password} = req.body
    try {
        if(!email || !password){
            return sendResponse(res, 400, "all fields required")
        }
        const result = await signinService({email, password})
        return sendResponse(res, 200, "signin successful", result)

    } catch (error) {
        console.log(error)
        const message = error.message || 'something went wrong'
        return sendResponse(res, 500, message)
    }
}