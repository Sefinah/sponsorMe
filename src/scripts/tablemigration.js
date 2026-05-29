
import { createTable, pool } from "../config/db.js"
console.log('coming from table migration.js')
const runMigration = async () => {
    console.log('migration started')
    await createTable()
    await pool.end()
    console.log('migration ended')
}
runMigration()