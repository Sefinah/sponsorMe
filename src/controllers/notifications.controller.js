import { getNotificationsService, markAsReadService } from "../services/notifications.service.js"
import { sendResponse } from "../utils/sendresponse.js"

export const getNotifications = async (req, res) => {
    try {
        const userId = req.user.userId
        const result = await getNotificationsService(userId)
        return sendResponse(res, 200, "notifications retrieved successfully", result)
    } catch (error) {
        const message = error.message || 'something went wrong'
        return sendResponse(res, 500, message)
    }
}

export const markAsRead = async (req, res) => {
    try {
        const id = req.params.id
        const userId = req.user.userId
        const result = await markAsReadService(id, userId)
        return sendResponse(res, 200, "notification marked as read", result)
    } catch (error) {
        const message = error.message || 'something went wrong'
        return sendResponse(res, 500, message)
    }
}