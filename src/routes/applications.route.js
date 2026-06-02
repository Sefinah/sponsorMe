import { Router } from "express"
import { verifyToken } from "../middlewares/verifyToken.js"
import { verifyRole } from "../middlewares/verifyRole.js"
import { createApplication, deleteApplication, getAllApplications, getMyApplications, updateApplicationStatus } from "../controllers/applications.controller.js"


const router = Router()
router.post("/applications", verifyToken, verifyRole(["job_seeker", "admin"]), createApplication)
router.get("/applications/me", verifyToken, verifyRole(["job_seeker", "admin"]), getMyApplications)
router.get("/applications", verifyToken, verifyRole(["admin"]), getAllApplications)
router.patch("/applications/:id", verifyToken, verifyRole(["employer", "admin"]), updateApplicationStatus )
router.delete("/applications/:id", verifyToken, verifyRole(["job_seeker", "admin"]), deleteApplication)

export default router