import { pool } from '../config/db.js'

export const saveJobService = async (userId, jobId) => {
    try {
        const alreadySaved = await pool.query(
            'SELECT id FROM saved_jobs WHERE user_id = $1 AND job_id = $2', [userId, jobId]
        )
        if (alreadySaved.rows.length > 0) {
            throw new Error('Job already saved')
        }
        const result = await pool.query(`
            INSERT INTO saved_jobs(user_id, job_id)
            VALUES ($1, $2)
            RETURNING *`, [userId, jobId])
        console.log(result.rows)
        return result.rows
    } catch (error) {
        throw error
    }
}

export const getSavedJobsService = async (userId) => {
    try {
        const result = await pool.query(`
            SELECT saved_jobs.*, jobs.title, jobs.location, jobs.salary_min, jobs.salary_max, jobs.employment_type, jobs.visa_type
            FROM saved_jobs
            INNER JOIN jobs ON saved_jobs.job_id = jobs.id
            WHERE saved_jobs.user_id = $1`, [userId])
        console.log(result.rows)
        return result.rows
    } catch (error) {
        throw error
    }
}

export const deleteSavedJobService = async (userId, jobId) => {
    try {
        const idExist = await pool.query(
            'SELECT id FROM saved_jobs WHERE user_id = $1 AND job_id = $2', [userId, jobId]
        )
        if (idExist.rows.length === 0) {
            throw new Error('Saved job not found')
        }
        const result = await pool.query(
            'DELETE FROM saved_jobs WHERE user_id = $1 AND job_id = $2', [userId, jobId]
        )
        console.log(result.rows)
        return result.rows
    } catch (error) {
        throw error
    }
}