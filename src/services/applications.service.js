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

export const getMyApplicationsService = async (seekerId, page=1, perPage=10, status) => {
    try {
        page = Math.max(1, parseInt(page) || 1)
        perPage = Math.min(100, Math.max(1, parseInt(perPage) || 10))
        const offSet = (page - 1) * perPage

        const seekerProfile = await pool.query(

        'SELECT id FROM seeker_profile WHERE user_id = $1', [seekerId]
        )

        if (seekerProfile.rows.length === 0) {
            throw new Error('Seeker profile not found')
        }

        const seekerProfileId = seekerProfile.rows[0].id
        const conditions = []
        const params = []
        let paramIndex = 1


        if (status) {
            conditions.push(`status ILIKE $${paramIndex}`)
            params.push(`%${status}%`)
            paramIndex++
        }
        conditions.push(`seeker_id = $${paramIndex}`)
        params.push(seekerProfileId)
        paramIndex++
    
        const whereClause = conditions.length > 0? `WHERE ${conditions.join(' AND ')}` : ''
        
        const countResult = await pool.query(`SELECT COUNT(*) FROM applications ${whereClause}`, params)
        const total = parseInt(countResult.rows[0].count)
        const result = await pool.query(`
            SELECT * FROM applications ${whereClause} 
            ORDER BY created_at DESC 
            LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`,[...params, perPage, offSet] )
        console.log(result.rows)
        return {
            data: result.rows, 
            pagination: {
                page, 
                perPage,
                total,
                totalPages: Math.ceil(total/perPage),
                hasNextPage: page * perPage < total, 
                hasPreviousPage: page > 1
            }
        }
    } catch (error) {
        throw error
    }
}

export const getAllApplicationsService = async () => {
    try {
        const result = await pool.query(`SELECT * FROM applications ORDER BY created_at DESC`)
        console.log(result.rows)
        return result.rows
    } catch (error) {
        throw error
    }
}

export const updateApplicationStatusService = async (id, userId, data) => {
    try {
        const idExist = await pool.query('SELECT id FROM applications WHERE id = $1', [id])
        console.log(idExist.rows)
        if (idExist.rows.length === 0) {
            throw new Error('Application not found')
        }

        const job = await pool.query(
            'SELECT employer_id FROM applications INNER JOIN jobs ON applications.job_id = jobs.id WHERE applications.id = $1', [id]
        )
        const employer = await pool.query(
            'SELECT id FROM employer_profile WHERE user_id = $1', [userId]
        )
        if (job.rows[0].employer_id !== employer.rows[0].id) {
            throw new Error('You do not own this job')
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