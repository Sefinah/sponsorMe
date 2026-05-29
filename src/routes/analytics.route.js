import { Router } from "express"
import { verifyToken } from "../middlewares/verifyToken.js"
import { verifyRole } from "../middlewares/verifyRole.js"
import { getEmployerAnalytics, getJobAnalytics } from "../controllers/analytics.controller.js"

const router = Router()

router.get("/analytics/employer", verifyToken, verifyRole(["employer"]), getEmployerAnalytics)
router.get("/analytics/jobs/:id", verifyToken, verifyRole(["employer"]), getJobAnalytics)

export default router