import express from 'express'
import { isDbConnected } from './src/config/db.js'
import authRoute from './src/routes/auth.route.js'
import dotenv from "dotenv"
import jobsRoute from './src/routes/jobs.route.js'
import applicationsRoute from './src/routes/applications.route.js'
import seekerRoute from './src/routes/seeker.route.js'
import companyRoute from './src/routes/company.route.js'
import analyticsRoute from './src/routes/analytics.route.js'
import savedJobsRoute from './src/routes/savedJobs.route.js'
import notificationRoute from './src/routes/notifications.route.js'
import cors from 'cors'

dotenv.config()

const app = express()
app.use(express.json())

const allowedOrigins = ["http://localhost:5173", "https://sponsor-me-gamma.vercel.app"]
app.use(cors({
    origin: allowedOrigins, 
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Authorization", "Content-Type"]
    
}))
app.use("api/v1", authRoute)
app.use("api/v1", jobsRoute)
app.use("api/v1", applicationsRoute)
app.use("api/v1", seekerRoute)
app.use("api/v1", companyRoute)
app.use("api/v1", analyticsRoute)
app.use("api/v1", savedJobsRoute)
app.use("api/v1", notificationRoute)


// 404 catch all middleware
// if the code reaches this point, it means all the routes listed above are not working
app.use((req,res,next)=>{
    const error = new Error(`Route not found`)
    res.status(404)
    next(error)
})

// catch all errors
app.use((error, req, res, next)=>{
    res.status(500).json({
        message: error.message || 'Internal server error'
    })
})

const port = process.env.PORT



app.listen(port, () => {
    console.log('server is running on port 3000')
    isDbConnected()
})