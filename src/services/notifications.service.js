import { pool } from '../config/db.js'

export const getNotificationsService = async (userId) => {
    try {
        const result = await pool.query(`
            SELECT * FROM notifications WHERE user_id = $1
            ORDER BY created_at DESC`, [userId])
        console.log(result.rows)
        return result.rows
    } catch (error) {
        throw error
    }
}

export const markAsReadService = async (id, userId) => {
    try {
        const idExist = await pool.query(
            'SELECT id FROM notifications WHERE id = $1 AND user_id = $2', [id, userId]
        )
        if (idExist.rows.length === 0) {
            throw new Error('Notification not found')
        }
        const result = await pool.query(`
            UPDATE notifications SET
            is_read = true
            WHERE id = $1 RETURNING *`, [id])
        console.log(result.rows)
        return result.rows
    } catch (error) {
        throw error
    }
}