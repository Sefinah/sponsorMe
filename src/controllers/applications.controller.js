import { createApplicationService, deleteApplicationService, getMyApplicationsService, updateApplicationStatusService } from "../services/applications.service.js";
import { sendResponse } from "../utils/sendresponse.js";

export const createApplication = async (req, res) => {
    try {
        const seekerId = req.user.userId
        const { jobId, coverLetter, resumeUrl } = req.body
        if (!jobId || !coverLetter || !resumeUrl) {
            return sendResponse(res, 400, "all fields required")
        }
        const result = await createApplicationService({ seekerId, jobId, coverLetter, resumeUrl })
        return sendResponse(res, 201, "application created successfully", result)
    } catch (error) {
        const message = error.message || 'something went wrong'
        return sendResponse(res, 500, message)
    }
}

export const getMyApplications = async (req, res) => {
    try {
        const seekerId = req.user.userId
        const result = await getMyApplicationsService(seekerId)
        return sendResponse(res, 200, "My Applications gotten successfully", result )
    } catch (error) {
       const message = error.message || 'Something went wrong'
       return sendResponse(res, 500, message) 
    }
}

export const updateApplicationStatus = async (req, res) => {
    try {
        const id = req.params.id
        const { status } = req.body
        const result = await updateApplicationStatusService (id, { status })
        return sendResponse(res, 200, "application status updated successfully", result)
    } catch (error) {
        const message = error.message || 'something went wrong'
        return sendResponse(res, 500, message)
    }
}

export const deleteApplication = async (req, res) => {
    try {
        const id = req.params.id
        const result = await deleteApplicationService(id)
        return sendResponse(res, 200, "application withdrawn successfully")
    } catch (error) {
        const message = error.message || 'something went wrong'
        return sendResponse(res, 500, message)
    }
}