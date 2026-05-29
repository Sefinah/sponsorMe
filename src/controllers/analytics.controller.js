import { getEmployerAnalyticsService, getJobAnalyticsService } from "../services/analytics.service.js"
import { sendResponse } from "../utils/sendresponse.js"

export const getEmployerAnalytics = async (req, res) => {
    try {
        const userId = req.user.userId
        const result = await getEmployerAnalyticsService(userId)
        return sendResponse(res, 200, "employer analytics retrieved successfully", result)
    } catch (error) {
        const message = error.message || 'something went wrong'
        return sendResponse(res, 500, message)
    }
}

export const getJobAnalytics = async (req, res) => {
    try {
        const id = req.params.id
        const result = await getJobAnalyticsService(id)
        return sendResponse(res, 200, "job analytics retrieved successfully", result)
    } catch (error) {
        const message = error.message || 'something went wrong'
        return sendResponse(res, 500, message)
    }
}