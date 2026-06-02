import { saveJobService, getSavedJobsService, deleteSavedJobService } from "../services/savedJobs.service.js"
import { sendResponse } from "../utils/sendresponse.js"

export const saveJob = async (req, res) => {
    try {
        const userId = req.user.userId
        const { jobId } = req.body
        if (!jobId) {
            return sendResponse(res, 400, "jobId is required")
        }
        const result = await saveJobService(userId, jobId)
        return sendResponse(res, 201, "job saved successfully", result)
    } catch (error) {
        const message = error.message || 'something went wrong'
        return sendResponse(res, 500, message)
    }
}

export const getSavedJobs = async (req, res) => {
    try {
        const userId = req.user.userId
        const { page, perPage } = req.query
        const result = await getSavedJobsService(userId, page, perPage)
        return sendResponse(res, 200, "saved jobs retrieved successfully", result)
    } catch (error) {
        const message = error.message || 'something went wrong'
        return sendResponse(res, 500, message)
    }
}

export const deleteSavedJob = async (req, res) => {
    try {
        const userId = req.user.userId
        const jobId = req.params.jobId
        const result = await deleteSavedJobService(userId, jobId)
        return sendResponse(res, 200, "saved job deleted successfully")
    } catch (error) {
        const message = error.message || 'something went wrong'
        return sendResponse(res, 500, message)
    }
}