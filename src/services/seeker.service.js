import { pool } from '../config/db.js'

export const getSeekerProfileService = async (userId) => {
    try {
        const result = await pool.query(`SELECT * FROM seeker_profile WHERE user_id = $1`, [userId])
        console.log(result.rows)
        if (result.rows.length === 0) {
            throw new Error('Seeker profile not found')
        }
        return result.rows
    } catch (error) {
        throw error
    }
}

export const updateSeekerProfileService = async (userId, data) => {
    try {
        const idExist = await pool.query('SELECT id FROM seeker_profile WHERE user_id = $1', [userId])
        console.log(idExist.rows)
        if (idExist.rows.length === 0) {
            throw new Error('Seeker profile not found')
        }
        const result = await pool.query(`
            UPDATE seeker_profile SET
            bio = COALESCE ($1, bio),
            skills = COALESCE ($2, skills),
            experience = COALESCE ($3, experience)
            WHERE user_id = $4 RETURNING *`,
            [data.bio, data.skills, data.experience, userId])
        console.log(result.rows)
        return result.rows
    } catch (error) {
        throw error
    }
}

export const uploadResumeService = async (userId, resumePath) => {
    try {
        const idExist = await pool.query('SELECT id FROM seeker_profile WHERE user_id = $1', [userId])
        console.log(idExist.rows)
        if (idExist.rows.length === 0) {
            throw new Error('Seeker profile not found')
        }
        const result = await pool.query(`
            UPDATE seeker_profile SET
            resume = $1
            WHERE user_id = $2 RETURNING *`,
            [resumePath, userId])
        console.log(result.rows)
        return result.rows
    } catch (error) {
        throw error
    }
}

export const getSeekerByIdService = async (id) => {
    try {
        const result = await pool.query(`SELECT * FROM seeker_profile WHERE id = $1`, [id])
        console.log(result.rows)
        if (result.rows.length === 0) {
            throw new Error('Seeker profile not found')
        }
        return result.rows
    } catch (error) {
        throw error
    }
}