import { Router } from "express"
import { verifyToken } from "../middlewares/verifyToken.js"
import { verifyRole } from "../middlewares/verifyRole.js"
import { getCompanyById, updateCompany } from "../controllers/company.controller.js"

const router = Router()

router.get("/companies/:id", getCompanyById)
router.put("/companies/:id", verifyToken, verifyRole(["employer", "admin"]), updateCompany)

export default router