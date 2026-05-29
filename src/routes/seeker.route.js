import { Router } from "express"
import { verifyToken } from "../middlewares/verifyToken.js"
import { verifyRole } from "../middlewares/verifyRole.js"
import { getSeekerProfile, updateSeekerProfile, uploadResume, getSeekerById } from "../controllers/seeker.controller.js"
import { upload } from "../middlewares/upload.js"

const router = Router()
router.post("/seekers/me/resume", verifyToken, verifyRole(["job_seeker"]), upload.single("resume"), uploadResume)
router.get("/seekers/me", verifyToken, verifyRole(["job_seeker"]), getSeekerProfile)
router.get("/seekers/:id", verifyToken, verifyRole(["employer"]), getSeekerById)
router.patch("/seekers/me", verifyToken, verifyRole(["job_seeker"]), updateSeekerProfile)


export default router