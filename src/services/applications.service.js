import { pool } from "../config/db.js"


export const createApplicationService = async (data) =>{
    try {
        const seekerProfile = await pool.query(
            'SELECT id FROM seeker_profile WHERE user_id = $1', [data.seekerId]
        )
        if (seekerProfile.rows.length == 0){
            throw new Error("Seeker profile not found")
        }
        const seekerProfileId = seekerProfile.rows[0].id

        const result = await pool.query(`
            INSERT INTO applications(job_id, seeker_id, cover_letter, resume_url)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
            [data.jobId, seekerProfileId, data.coverLetter, data.resumeUrl])
            return result.rows
    } catch (error) {
        throw error
    }
}

export const getMyApplicationsService = async (seekerId) => {
    try {
        const seekerProfile = await pool.query(
            'SELECT id FROM seeker_profile WHERE user_id = $1', [seekerId]
        )
        if (seekerProfile.rows.length === 0) {
            throw new Error('Seeker profile not found')
        }
        const seekerProfileId = seekerProfile.rows[0].id
        const result = await pool.query(`SELECT * FROM applications WHERE seeker_id = $1`, [seekerProfileId])
        console.log(result.rows)
        return result.rows
    } catch (error) {
        throw error
    }
}

export const updateApplicationStatusService = async (id, data) => {
    try {
        const idExist = await pool.query('SELECT id FROM applications WHERE id = $1', [id])
        console.log(idExist.rows)
        if (idExist.rows.length === 0) {
            throw new Error('Application not found')
        }
        const result = await pool.query(`
            UPDATE applications SET
            status = COALESCE ($1, status)
            WHERE id = $2 RETURNING *`,
            [data.status, id])
        console.log(result.rows)
        return result.rows
    } catch (error) {
        throw error
    }
}

export const deleteApplicationService = async (id) => {
    try {
        const idExist = await pool.query('SELECT id FROM applications WHERE id = $1', [id])
        console.log(idExist.rows)
        if (idExist.rows.length === 0) {
            throw new Error('Application not found')
        }
        const result = await pool.query('DELETE FROM applications WHERE id = $1', [id])
        console.log(result.rows)
        return result.rows
    } catch (error) {
        throw error
    }
}