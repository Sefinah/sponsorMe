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

export const getAllJobsService = async (page=1,search,perPage=10,visa_type,employment_type,experience_level,location) => {
    // http://localhost:3000/jobs?page=2&perPage=10&search=backend&visa_type=H-1B
    try {
        page = Math.max(1,parseInt(page) || 1)
        perPage = Math.min(100,Math.max(1,parseInt(perPage)|| 10))
        const offSet = (page-1) * perPage 

        const conditions = []
        const params = []
        let paramIndex = 1

        if (search){
            conditions.push(`title ILIKE $${paramIndex}`)
            params.push(`%${search}%`)
            paramIndex++
        }
        if (visa_type){
            conditions.push(`title ILIKE $${paramIndex}`)
            params.push(`%${visa_type}%`)
            paramIndex++
        }

        if (employment_type){
            conditions.push(`title ILIKE $${paramIndex}`)
            params.push(`%${employment_type}%`)
            paramIndex++
        }

        if (experience_level){
            conditions.push(`title ILIKE $${paramIndex}`)
            params.push(`%${experience_level}%`)
            paramIndex++
        }

        if (location){
            conditions.push(`title ILIKE $${paramIndex}`)
            params.push(`%${location}%`)
            paramIndex++
        }

        const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND  ')}` : ''
        const countResult = await pool.query(`SELECT COUNT(*) FROM jobs ${whereClause}`, params)
        const total = parseInt(countResult.rows[0].count)
        const result = await pool.query(`SELECT *, 
            (SELECT COUNT(*) FROM applications WHERE applications.job_id = jobs.id) AS application_count,
            (SELECT COUNT(*) FROM saved_jobs WHERE saved_jobs.job_id = jobs.id) AS saved_count
            FROM jobs ${whereClause}
            ORDER BY created_at DESC
            LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`,[...params,perPage,offSet])
 
        console.log(result.rows, "response from getjobservice")
    
        return {
            data: result.rows,
            pagination: {
                page,
                perPage,
                total,
                totalPages: Math.ceil(total/perPage),
                hasPreviousPage: page > 1
            }
        }
    } catch (error) {
        console.log(error)
        throw error

    }
}

export const getJobByIdService = async (id) => {
    try {
        const idExist = await pool.query('SELECT * FROM jobs WHERE id = $1', [id])
        console.log(idExist.rows)
        if (idExist.rows.length === 0) {
            throw new Error('Job not found')
        }
        await pool.query('UPDATE jobs SET view_count = view_count + 1 WHERE id = $1', [id])
        const job = await pool.query(`SELECT *,
            (SELECT COUNT(*) FROM applications WHERE applications.job_id = jobs.id) AS application_count,
            (SELECT COUNT(*) FROM saved_jobs WHERE saved_jobs.job_id = jobs.id) AS saved_count
            FROM jobs WHERE id = $1`, [id])
        console.log(job.rows)
        return job.rows
    } catch (error) {
        throw error
    }
}

export const updateJobService = async (id, userId, data) => {
    try {
        const idExist = await pool.query('SELECT id FROM jobs WHERE id = $1', [id])
        console.log(idExist.rows)
        if (idExist.rows.length === 0) {
            throw new Error('Job not found')
        }
        
        const job = await pool.query (
            'SELECT employer_id FROM jobs WHERE id = $1',[id]
        )
        const employer = await pool.query(
            'SELECT id FROM employer_profile WHERE user_id = $1', [userId]
        )
        if (job.rows[0].employer_id !==employer.rows[0].id){
            throw new Error('You do not own this job')
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


export const deleteJobService = async (id, userId) => {
    try {
        const idExist = await pool.query('SELECT id FROM jobs WHERE id = $1', [id])
        console.log(idExist.rows)
        if (idExist.rows.length === 0) {
            throw new Error('Job not found')
        }

        const job = await pool.query (
            'SELECT employer_id FROM jobs WHERE id = $1',[id]
        )
        const employer = await pool.query(
            'SELECT id FROM employer_profile WHERE user_id = $1', [userId]
        )
        if (job.rows[0].employer_id !==employer.rows[0].id){
            throw new Error('You do not own this job')
        }

        const result = await pool.query('DELETE FROM jobs WHERE id = $1', [id])
        console.log(result.rows)
        return result.rows
    } catch (error) {
        throw error
    }
}