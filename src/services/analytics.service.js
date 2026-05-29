import { pool } from '../config/db.js'

export const getEmployerAnalyticsService = async (userId) => {
    try {
        const employerProfile = await pool.query(
            'SELECT id FROM employer_profile WHERE user_id = $1', [userId]
        )
        if (employerProfile.rows.length === 0) {
            throw new Error('Employer profile not found')
        }
        const employerId = employerProfile.rows[0].id
        const result = await pool.query(`
            SELECT
            COUNT(jobs.id) AS total_jobs,
            SUM(jobs.view_count) AS total_views,
            (SELECT COUNT(*) FROM applications WHERE applications.job_id IN (SELECT id FROM jobs WHERE employer_id = $1)) AS total_applications
            FROM jobs WHERE employer_id = $1 AND status = 'active'`, [employerId])
        console.log(result.rows)
        return result.rows
    } catch (error) {
        throw error
    }
}

export const getJobAnalyticsService = async (id) => {
    try {
        const idExist = await pool.query('SELECT * FROM jobs WHERE id = $1', [id])
        if (idExist.rows.length === 0) {
            throw new Error('Job not found')
        }
        const result = await pool.query(`
            SELECT jobs.*,
            (SELECT COUNT(*) FROM applications WHERE applications.job_id = jobs.id) AS total_applications,
            (SELECT COUNT(*) FROM applications WHERE applications.job_id = jobs.id AND status = 'pending') AS pending,
            (SELECT COUNT(*) FROM applications WHERE applications.job_id = jobs.id AND status = 'reviewed') AS reviewed,
            (SELECT COUNT(*) FROM applications WHERE applications.job_id = jobs.id AND status = 'interview') AS interview,
            (SELECT COUNT(*) FROM applications WHERE applications.job_id = jobs.id AND status = 'rejected') AS rejected,
            (SELECT COUNT(*) FROM applications WHERE applications.job_id = jobs.id AND status = 'hired') AS hired
            FROM jobs WHERE id = $1`, [id])
        console.log(result.rows)
        return result.rows
    } catch (error) {
        throw error
    }
}