import { Router } from "express"
import { verifyToken } from "../middlewares/verifyToken.js"
import { verifyRole } from "../middlewares/verifyRole.js"
import { getCompanyById, createCompany, updateCompany } from "../controllers/company.controller.js"

const router = Router()

router.get("/companies/:id", getCompanyById)
router.post("/companies", verifyToken, verifyRole(["employer"]), createCompany)
router.put("/companies/:id", verifyToken, verifyRole(["employer"]), updateCompany)

export default router