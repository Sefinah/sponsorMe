import { createJobService, deleteJobService, getAllJobsService, updateJobService, getJobByIdService } from "../services/jobs.service.js"
import { sendResponse } from "../utils/sendresponse.js"

export const createJobs = async (req, res) =>{
    try {
        const employerId = req.user.userId
        const { title, description, location, salary_min, salary_max, skills_required, experience_level, employment_type, visa_type, deadline } = req.body
    if (!title || !description || !location || !salary_min || !salary_max || !skills_required || !experience_level || !employment_type || !visa_type || !deadline) {
        return sendResponse(res, 400, "All fields required")
    }
    const result = await createJobService ({ employerId, title, description, location, salary_min, salary_max, skills_required, experience_level, employment_type, visa_type, deadline })
    return sendResponse(res, 201, "Job created successfully", result)
    } catch (error) {
    const message = error.message || 'something went wrong'
            return sendResponse(res, 500, message)
    }
}

export const getAllJobs = async (req, res) => {
    // http://localhost:3000/jobs?page=2&perPage=10&search=backend&visa_type=H-1B
    try {
        const {page,search,perPage,visa_type,employment_type,experience_level,location} = req.query
        const result = await getAllJobsService(page,search,perPage,visa_type,employment_type,experience_level,location)
        return sendResponse(res, 200, "jobs gotten successfully", result)
    } catch (error) {
        const message = error.message || 'something went wrong'
        return sendResponse(res, 500, message)
    }
}

export const getJobId = async (req, res) => {
    try {
        const id = req.params.id
        const result = await getJobByIdService(id)
        return sendResponse(res, 200, "Requested job gotten successfully", result)
    } catch (error) {
        const message = error.message || 'something went wrong'
        return sendResponse(res, 500, message)
    }
}


export const updateJob = async (req, res) => {
    try {
        const id = req.params.id
        const userId = req.user.userId
        const { title, description, location, salary_min, salary_max, skills_required, experience_level, employment_type, visa_type, deadline } = req.body
        const result = await updateJobService(id, userId, { title, description, location, salary_min, salary_max, skills_required, experience_level, employment_type, visa_type, deadline })
        return sendResponse(res, 200, "job updated successfully", result)
    } catch (error) {
        const message = error.message || 'something went wrong'
        return sendResponse(res, 500, message)
    }
}

export const deleteJob = async (req, res) => {
    try {
        const id = req.params.id
        const userId = req.user.userId
        const result = await deleteJobService(id, userId)
        return sendResponse(res, 200, "job deleted successfully")
    } catch (error) {
        const message = error.message || 'something went wrong'
        return sendResponse(res, 500, message)
    }
}