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

export const getSavedJobsService = async (userId, page, perPage) => {
    try {
        page = Math.max(1, parseInt(page) || 1)
        perPage = Math.min(100, Math.max(1, parseInt(perPage) || 10))
        const offSet = (page - 1) * perPage

        const conditions = [`saved_jobs.user_id = $1`]
        const params = [userId]
        let paramIndex = 2

        const whereClause = `WHERE ${conditions.join(' AND ')}`
        const countResult = await pool.query(`SELECT COUNT(*) FROM saved_jobs ${whereClause}`, params)
        const total = parseInt(countResult.rows[0].count)
        const result = await pool.query(`
            SELECT saved_jobs.*, jobs.title, jobs.location, jobs.salary_min, jobs.salary_max, jobs.employment_type, jobs.visa_type
            FROM saved_jobs
            INNER JOIN jobs ON saved_jobs.job_id = jobs.id
            ${whereClause}
            ORDER BY saved_jobs.created_at DESC
            LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`,
            [...params, perPage, offSet])

        console.log(result.rows)
        
        return {
            data: result.rows,
            pagination: {
                page,
                perPage,
                total,
                totalPages: Math.ceil(total / perPage),
                hasNextPage: page * perPage < total,
                hasPreviousPage: page > 1
            }
        }
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