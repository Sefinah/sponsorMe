import { pool } from '../config/db.js'

export const createJobService = async (data) => {
    try {
        // first get the employer profile id
        const employerProfile = await pool.query(
            'SELECT id FROM employer_profile WHERE user_id = $1', 
            [data.employerId]
        )
        if (employerProfile.rows.length === 0) {
            throw new Error('Employer profile not found')
        }
        const employerProfileId = employerProfile.rows[0].id

        const result = await pool.query(`
            INSERT INTO jobs(employer_id, title, description, location, salary_min, salary_max, skills_required, experience_level, employment_type, visa_type, deadline)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            RETURNING *`,
            [employerProfileId, data.title, data.description, data.location, data.salary_min, data.salary_max, data.skills_required, data.experience_level, data.employment_type, data.visa_type, data.deadline])
        return result.rows
    } catch (error) {
        throw error
    }
}

export const getAllJobsService = async () => {
    try {
        const result = await pool.query(`SELECT *, 
            (SELECT COUNT(*) FROM applications WHERE applications.job_id = jobs.id) AS application_count,
            (SELECT COUNT(*) FROM saved_jobs WHERE saved_jobs.job_id = jobs.id) AS saved_count
            FROM jobs`)
        console.log(result.rows)
        return result.rows
    } catch (error) {
        throw error
    }
}

export const getJobById = async (req, res) => {
    try {
        const id = req.params.id
        const result = await getAllJobsService(id)
        return res.status(201).json({
            message: "job gotten successfully",
            data: result
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || "something went wrong"
        })
    }
}

export const updateJobService = async (id, data) => {
    try {
        const idExist = await pool.query('SELECT id FROM jobs WHERE id = $1', [id])
        console.log(idExist.rows)
        if (idExist.rows.length === 0) {
            throw new Error('Job not found')
        }
        const result = await pool.query(`
            UPDATE jobs SET
            title = COALESCE ($1, title),
            description = COALESCE ($2, description),
            location = COALESCE ($3, location),
            salary_min = COALESCE ($4, salary_min),
            salary_max = COALESCE ($5, salary_max),
            skills_required = COALESCE ($6, skills_required),
            experience_level = COALESCE ($7, experience_level),
            employment_type = COALESCE ($8, employment_type),
            visa_type = COALESCE ($9, visa_type),
            deadline = COALESCE ($10, deadline)
            WHERE id = $11 RETURNING *`,
            [data.title, data.description, data.location, data.salary_min, data.salary_max, data.skills_required, data.experience_level, data.employment_type, data.visa_type, data.deadline, id])
        console.log(result.rows)
        return result.rows
    } catch (error) {
        throw error
    }
}


export const deleteJobService = async (id) => {
    try {
        const idExist = await pool.query('SELECT id FROM jobs WHERE id = $1', [id])
        console.log(idExist.rows)
        if (idExist.rows.length === 0) {
            throw new Error('Job not found')
        }
        const result = await pool.query('DELETE FROM jobs WHERE id = $1', [id])
        console.log(result.rows)
        return result.rows
    } catch (error) {
        throw error
    }
}