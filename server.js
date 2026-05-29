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

dotenv.config()

const app = express()
app.use(express.json())

app.use(authRoute)
app.use(jobsRoute)
app.use(applicationsRoute)
app.use(seekerRoute)
app.use(companyRoute)
app.use(analyticsRoute)
app.use(savedJobsRoute)
app.use(notificationRoute)


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