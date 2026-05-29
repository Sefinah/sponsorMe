import { createJobService, deleteJobService, getAllJobsService, updateJobService } from "../services/jobs.service.js"
import { sendResponse } from "../utils/sendresponse.js"

export const createJobs = async (req, res) =>{
    try {
        const employerId = req.user.userId
        const { title, description, location, salary_min, salary_max, skills_required, experience_level, employment_type, visa_type, deadline } = req.body
    if (!title || !description || !location || !salary_min || !salary_max || !skills_required || !experience_level || !employment_type || !visa_type || !deadline) {
        return sendResponse(res, 400, "All required required")
    }
    const result = await createJobService ({ employerId, title, description, location, salary_min, salary_max, skills_required, experience_level, employment_type, visa_type, deadline })
    return sendResponse(res, 201, "Job created successfully", result)
    } catch (error) {
    const message = error.message || 'something went wrong'
            return sendResponse(res, 500, message)
    }
}

export const getAllJobs = async (req, res) => {
    try {
        const result = await getAllJobsService()
        return sendResponse(res, 200, "jobs gotten successfully", result)
    } catch (error) {
        const message = error.message || 'something went wrong'
        return sendResponse(res, 500, message)
    }
}

export const getJobId = async (req, res) => {
    try {
        const id = req.params.id
        const result = await getAllJobsService(id)
        return sendResponse(res, 200, "Requested job gotten successfully", result)
    } catch (error) {
        const message = error.message || 'something went wrong'
        return sendResponse(res, 500, message)
    }
}


export const updateJob = async (req, res) => {
    try {
        const id = req.params.id
        const { title, description, location, salary_min, salary_max, skills_required, experience_level, employment_type, visa_type, deadline } = req.body
        const result = await updateJobService(id, { title, description, location, salary_min, salary_max, skills_required, experience_level, employment_type, visa_type, deadline })
        return sendResponse(res, 200, "job updated successfully", result)
    } catch (error) {
        const message = error.message || 'something went wrong'
        return sendResponse(res, 500, message)
    }
}

export const deleteJob = async (req, res) => {
    try {
        const id = req.params.id
        const result = await deleteJobService(id)
        return sendResponse(res, 200, "job deleted successfully")
    } catch (error) {
        const message = error.message || 'something went wrong'
        return sendResponse(res, 500, message)
    }
}