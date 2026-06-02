import { Router } from "express"
import { verifyToken } from "../middlewares/verifyToken.js"
import { verifyRole } from "../middlewares/verifyRole.js"
import { saveJob, getSavedJobs, deleteSavedJob } from "../controllers/savedJobs.controller.js"

const router = Router()

router.post("/saved-jobs", verifyToken, verifyRole(["job_seeker", "admin"]), saveJob)
router.get("/saved-jobs", verifyToken, verifyRole(["job_seeker", "admin"]), getSavedJobs)
router.delete("/saved-jobs/:jobId", verifyToken, verifyRole(["job_seeker", "admin"]), deleteSavedJob)

export default router