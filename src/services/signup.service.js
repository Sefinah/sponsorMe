import { pool } from "../config/db.js";
import bcrypt from 'bcrypt'
import { sendEmployerWelcomeEmail, sendSeekerWelcomeEmail } from "../utils/email.js";


export const employerSignupService = async (data)=> {
    const client = await pool.connect()
    try {
        const emailExist = await pool.query('SELECT * FROM users WHERE email = $1', [data.email])
    console.log (emailExist.rows)
    if (emailExist.rows.length > 0){
        throw new Error('Email already exist')
    }
    const hashedPassword = await bcrypt.hash(data.password, 10)
    // start the transaction 
    await client.query('BEGIN')
    // insert into users table
    const userResult = await client.query (`
        INSERT INTO users (first_name, last_name, email, role, password)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, first_name, last_name, email, role`,
        [data.firstName, data.lastName, data.email, data.role, hashedPassword])
        const user = userResult.rows[0]
        // insert into employersProfileTable
        const employersResult = await client.query(`
            INSERT INTO employer_profile(user_id, company_name, company_size, industry, location)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`,
        [user.id, data.companyName, data.companySize, data.industry, data.location])
        const employerProfile = employersResult.rows[0]
        await client.query('COMMIT')
        sendEmployerWelcomeEmail(user.email, user.first_name)
        return {
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            role: user.role,
            companyName: employerProfile.company_name,
            companySize: employerProfile.company_size,
            industry: employerProfile.industry,
            location: employerProfile.location
        }
        
    } catch (error) {
        await client.query('ROLLBACK')
        throw error
    }finally{
        client.release()
    }
    
}

export const jobSeekerSignupService = async (data)=> {
    console.log(data)
    const client = await pool.connect()
    try {
        const emailExist = await client.query('SELECT * FROM users WHERE email = $1', [data.email])
    console.log (emailExist.rows)
    if (emailExist.rows.length > 0){
        throw new Error('Email already exist')
    }
    const hashedPassword = await bcrypt.hash(data.password, 10)
    await client.query('BEGIN')
    const userResult = await client.query (`
        INSERT INTO users (first_name, last_name, email, role, password)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, first_name, last_name, email, role`,
        [data.firstName, data.lastName, data.email, data.role, hashedPassword])
        const user = userResult.rows[0]
        const seekerResult = await client.query(`
            INSERT INTO seeker_profile(user_id, bio, skills, experience, resume)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`,
        [user.id, data.bio, data.skills, data.experience, data.resumePath])
        const seekerProfile = seekerResult.rows[0]
        await client.query('COMMIT')
        sendSeekerWelcomeEmail(user.email, user.first_name)
        return {
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            role: user.role,
            bio: data.bio,
            skills: data.skills,
            experience: data.experience
        }
        
    } catch (error) {
        await client.query('ROLLBACK')
        console.log(error)
        throw error
    }finally{
        client.release()
    }
    
}


export const adminSignupService = async (data) => {
    console.log(data)
    const client = await pool.connect()
    try {
        const emailExist = await client.query('SELECT * FROM users WHERE email = $1', [data.email])
        console.log(emailExist.rows)
        if (emailExist.rows.length > 0) {
            throw new Error('Email already exist')
        }
        const hashedPassword = await bcrypt.hash(data.password, 10)
        await client.query('BEGIN')
        const userResult = await client.query(`
            INSERT INTO users (first_name, last_name, email, role, password)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, first_name, last_name, email, role`,
            [data.firstName, data.lastName, data.email, data.role, hashedPassword])
        const user = userResult.rows[0]
        await client.query('COMMIT')
        return {
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            role: user.role
        }
    } catch (error) {
        await client.query('ROLLBACK')
        console.log(error)
        throw error
    } finally {
        client.release()
    }
}
