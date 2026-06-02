import { Router } from "express";
import { adminSignup, employerSignup, jobSeekerSignup, } from "../controllers/signup.controller.js";
import { signin } from "../controllers/signin.controller.js";
import { upload } from "../middlewares/upload.js";

const router = Router()
router.post("/employer/signup", employerSignup)
router.post("/job-seekers/signup",upload.single("resume"), jobSeekerSignup)
router.post("/signin", signin)
router.post("/admin/signup", adminSignup)

export default router