import winston, { format } from "winston";
import path from "path"

// this is a custom error logging. This is an alternative for console.log
const {combine, timestamp, errors, colorize, printf} = winston.format
const customFormat = printf(({level, message, timestamp, stack})=>{
    return `
    ${timestamp} [${level}]: ${stack || message}
    `
})

export const logger = winston.createLogger({
    level: 'info',
    format: combine(timestamp({format:"DD-MM-YYYY HH:mm:ss"}),errors({stack: true}),customFormat),
    transports:[
        new winston.transports.File({
            filename: path.join("logs","combined.log")
        })
    ]
    
    
})

logger.add(new winston.transports.Console({
    format: combine(colorize(), customFormat)
}))