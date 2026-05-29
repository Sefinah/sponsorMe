import { Router } from "express"
import { verifyToken } from "../middlewares/verifyToken.js"
import { verifyRole } from "../middlewares/verifyRole.js"
import { createApplication, deleteApplication, getMyApplications, updateApplicationStatus } from "../controllers/applications.controller.js"


const router = Router()
router.post("/applications", verifyToken, verifyRole(["job_seeker"]), createApplication)
router.get("/applications/me", verifyToken, verifyRole(["job_seeker"]), getMyApplications)
router.patch("/applications/:id", verifyToken, verifyRole(["employer"]), updateApplicationStatus )
router.delete("/applications/:id", verifyToken, verifyRole(["job_seeker"]), deleteApplication)

export default router