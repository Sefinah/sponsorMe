import { Router } from "express"
import { verifyToken } from "../middlewares/verifyToken.js";
import { verifyRole } from "../middlewares/verifyRole.js";
import { createJobs, deleteJob, getAllJobs, getJobId, updateJob } from "../controllers/jobs.controller.js"


const router = Router()
router.post("/jobs", verifyToken, verifyRole(["employer", "admin"]), createJobs)
router.get("/jobs", verifyToken, getAllJobs)
router.get("/jobs/:id", verifyToken, getJobId )
router.patch("/jobs/:id", verifyToken, verifyRole(["employer", "admin"]), updateJob )
router.delete("/jobs/:id", verifyToken, verifyRole(["employer", "admin"]), deleteJob)

export default router