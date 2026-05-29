import { employerSignupService, jobSeekerSignupService } from "../services/signup.service.js"
import { sendResponse } from "../utils/sendresponse.js"


export const employerSignup = async (req, res) =>{
    try {
        const {firstName, lastName, email, role, password, companyName, companySize, industry, location} = req.body

        if (!firstName || !lastName || !email || !role || !password){
            return sendResponse(res, 400, "All fields required")
        }
        if (password.length < 15) {
            return sendResponse(res, 400, "password must be at least 14 characters")
        }
        const result = await employerSignupService ({firstName, lastName, email, role, password, companyName, companySize, industry, location})
            return sendResponse(res, 201, 'User created successfully', result)
            
    } catch (error) {
        const message = error.message || 'something went wrong'
        return sendResponse(res, 500, message)
    }
}

export const jobSeekerSignup = async (req, res) =>{
    try {
         console.log(req.file)
        const {firstName, lastName, email, role, password, bio, skills, experience} = req.body
        if (!req.file){
            return sendResponse(res, 400, "Resume required")
        }

        if (!firstName || !lastName || !email || !role || !password){
            return sendResponse(res, 400, "All fields required")
        }
        if (password.length < 15) {
            return sendResponse(res, 400, "password must be at least 14 characters")
        }
        const resumePath = req.file.path
       
        const result = await jobSeekerSignupService ({firstName, lastName, email, role, password, bio, skills, experience, resumePath})
            return sendResponse(res, 201, 'User created successfully', result)
            
    } catch (error) {
        const message = error.message || 'something went wrong'
        return sendResponse(res, 500, message)
    }
}