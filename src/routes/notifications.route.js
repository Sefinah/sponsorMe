import { Router } from "express"
import { verifyToken } from "../middlewares/verifyToken.js"
import { getNotifications, markAsRead } from "../controllers/notifications.controller.js"

const router = Router()

router.get("/notifications", verifyToken, getNotifications)
router.patch("/notifications/:id/read", verifyToken, markAsRead)

export default router