import { getCompanyByIdService, createCompanyService, updateCompanyService } from "../services/company.service.js"
import { sendResponse } from "../utils/sendresponse.js"

export const getCompanyById = async (req, res) => {
    try {
        const id = req.params.id
        const result = await getCompanyByIdService(id)
        return sendResponse(res, 200, "company retrieved successfully", result)
    } catch (error) {
        const message = error.message || 'something went wrong'
        return sendResponse(res, 500, message)
    }
}

export const createCompany = async (req, res) => {
    try {
        const userId = req.user.userId
        const { companyName, companySize, industry, location } = req.body
        const result = await createCompanyService(userId, { companyName, companySize, industry, location })
        return sendResponse(res, 201, "company created successfully", result)
    } catch (error) {
        const message = error.message || 'something went wrong'
        return sendResponse(res, 500, message)
    }
}

export const updateCompany = async (req, res) => {
    try {
        const id = req.params.id
        const userId = req.user.userId
        const { companyName, companySize, industry, location } = req.body
        const result = await updateCompanyService(id, userId, { companyName, companySize, industry, location })
        return sendResponse(res, 200, "company updated successfully", result)
    } catch (error) {
        const message = error.message || 'something went wrong'
        return sendResponse(res, 500, message)
    }
}