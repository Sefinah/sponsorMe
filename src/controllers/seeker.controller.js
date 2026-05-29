import { getSeekerProfileService, updateSeekerProfileService, uploadResumeService, getSeekerByIdService } from "../services/seeker.service.js"
import { sendResponse } from "../utils/sendresponse.js"

export const getSeekerProfile = async (req, res) => {
    try {
        const userId = req.user.userId
        const result = await getSeekerProfileService(userId)
        return sendResponse(res, 200, "seeker profile retrieved successfully", result)
    } catch (error) {
        const message = error.message || 'something went wrong'
        return sendResponse(res, 500, message)
    }
}

export const updateSeekerProfile = async (req, res) => {
    try {
        const userId = req.user.userId
        const { bio, skills, experience } = req.body
        const result = await updateSeekerProfileService(userId, { bio, skills, experience })
        return sendResponse(res, 200, "seeker profile updated successfully", result)
    } catch (error) {
        const message = error.message || 'something went wrong'
        return sendResponse(res, 500, message)
    }
}

export const uploadResume = async (req, res) => {
    try {
        const userId = req.user.userId
        if (!req.file) {
            return sendResponse(res, 400, "resume file required")
        }
        const resumePath = req.file.path
        const result = await uploadResumeService(userId, resumePath)
        return sendResponse(res, 200, "resume uploaded successfully", result)
    } catch (error) {
        const message = error.message || 'something went wrong'
        return sendResponse(res, 500, message)
    }
}

export const getSeekerById = async (req, res) => {
    try {
        const id = req.params.id
        const result = await getSeekerByIdService(id)
        return sendResponse(res, 200, "seeker profile retrieved successfully", result)
    } catch (error) {
        const message = error.message || 'something went wrong'
        return sendResponse(res, 500, message)
    }
}