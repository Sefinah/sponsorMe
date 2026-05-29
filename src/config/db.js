import { Pool } from "pg";
import { addEmploymentTypeConstraint, addExperienceLevelConstraint, addRoleConstraint, addUpdatedAtToApplications, addUpdatedAtToEmployerProfile, addUpdatedAtToJobs, addUpdatedAtToUsers, addVisaTypeConstraint, applicationTable, employerProfileTable, jobTable, notificationTable, savedJobsTable, seekerProfileTable, userTable } from "../models/createuserstable.js";
import { logger } from "../utils/logger.js";
import dotenv from "dotenv"
dotenv.config()


export const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password:process.env.DB_PASSWORD,
    port: process.env.DB_PORT
})

export const isDbConnected = async ()=>{
    try {
        const res = await pool.query ("SELECT NOW ()")
        console.log('db connected', res.rows[0])
        logger.info('db connected')
    } catch (error) {
        console.log("db not connected", error.message)
    }
}

export const createTable = async () => {
    const client = await pool.connect()
    try {
        await client.query(userTable)
        console.log('user table created')
        await client.query(seekerProfileTable)
        console.log('seeker_profile table created')
        await client.query(employerProfileTable)
        console.log('employee_profile table created')
        await client.query(jobTable)
        console.log('job table created')
        await client.query (applicationTable)
        console.log('application table created')
        await client.query(notificationTable)
        console.log('notification table created')
        await client.query(savedJobsTable)
        console.log('saved_job table created')
        await client.query(addRoleConstraint)
        console.log('role constraint added')
        await client.query(addExperienceLevelConstraint)
        console.log('role constraint added')
        await client.query(addEmploymentTypeConstraint)
        console.log('role constraint added')
        await client.query(addVisaTypeConstraint)
        console.log('role constraint added')
        await client.query(addUpdatedAtToUsers)
        console.log('users constraint added')
        await client.query(addUpdatedAtToJobs)
        console.log('jobs constraint added')
        await client.query(addUpdatedAtToApplications)
        console.log('applications constraint added')
        await client.query(addUpdatedAtToEmployerProfile)
        console.log('employer_profile constraint added')
    } catch (error) {
        console.log ('error from createtable', error)
    } finally{
        client.release()
    }
}