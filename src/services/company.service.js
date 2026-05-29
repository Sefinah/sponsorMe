import { pool } from '../config/db.js'

export const getCompanyByIdService = async (id) => {
    try {
        const result = await pool.query(`
            SELECT employer_profile.*,
            (SELECT json_agg(jobs) FROM jobs WHERE jobs.employer_id = employer_profile.id AND jobs.status = 'active') AS active_jobs
            FROM employer_profile WHERE id = $1`, [id])
        console.log(result.rows)
        if (result.rows.length === 0) {
            throw new Error('Company not found')
        }
        return result.rows
    } catch (error) {
        throw error
    }
}

export const createCompanyService = async (userId, data) => {
    try {
        const result = await pool.query(`
            UPDATE employer_profile SET
            company_name = COALESCE ($1, company_name),
            company_size = COALESCE ($2, company_size),
            industry = COALESCE ($3, industry),
            location = COALESCE ($4, location)
            WHERE user_id = $5 RETURNING *`,
            [data.companyName, data.companySize, data.industry, data.location, userId])
        console.log(result.rows)
        return result.rows
    } catch (error) {
        throw error
    }
}

export const updateCompanyService = async (id, userId, data) => {
    try {
        const idExist = await pool.query('SELECT id FROM employer_profile WHERE id = $1 AND user_id = $2', [id, userId])
        console.log(idExist.rows)
        if (idExist.rows.length === 0) {
            throw new Error('Company not found')
        }
        const result = await pool.query(`
            UPDATE employer_profile SET
            company_name = COALESCE ($1, company_name),
            company_size = COALESCE ($2, company_size),
            industry = COALESCE ($3, industry),
            location = COALESCE ($4, location)
            WHERE id = $5 RETURNING *`,
            [data.companyName, data.companySize, data.industry, data.location, id])
        console.log(result.rows)
        return result.rows
    } catch (error) {
        throw error
    }
}