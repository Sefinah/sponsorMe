

export const userTable = `
CREATE TABLE IF NOT EXISTS users(
id SERIAL PRIMARY KEY,
first_name VARCHAR(100),
last_name VARCHAR(100),
email VARCHAR(100) UNIQUE,
password VARCHAR(100),
role VARCHAR(20),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`

export const seekerProfileTable = `
CREATE TABLE IF NOT EXISTS seeker_profile(
id SERIAL PRIMARY KEY,
user_id INT REFERENCES users(id) ON DELETE CASCADE,
bio VARCHAR(100),
skills VARCHAR(100),
experience VARCHAR(200),
resume TEXT
)
`

export const employerProfileTable = `
CREATE TABLE IF NOT EXISTS employer_profile(
id SERIAL PRIMARY KEY,
user_id INT REFERENCES users(id) ON DELETE CASCADE,
company_name VARCHAR(100),
company_size VARCHAR(100),
industry VARCHAR(100),
location VARCHAR(100),
is_verified BOOLEAN DEFAULT false
)
`

export const jobTable = `
CREATE TABLE IF NOT EXISTS jobs(
id SERIAL PRIMARY KEY,
employer_id INT REFERENCES employer_profile(id),
title VARCHAR(100),
description TEXT,
location VARCHAR(50),
salary_min INT,
salary_max INT,
skills_required TEXT,
experience_level VARCHAR(50),
employment_type VARCHAR(50),
visa_type VARCHAR(100),
meets_threshold BOOLEAN DEFAULT false,
deadline DATE,
status VARCHAR(50) DEFAULT 'active',
view_count INT DEFAULT 0,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`

export const applicationTable = `
CREATE TABLE IF NOT EXISTS applications(
id SERIAL PRIMARY KEY,
job_id INT REFERENCES jobs(id) ON DELETE CASCADE,
seeker_id INT REFERENCES users(id) ON DELETE CASCADE,
cover_letter TEXT,
resume_url TEXT,
status VARCHAR(50) DEFAULT 'pending',
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`

export const notificationTable = `
CREATE TABLE IF NOT EXISTS notifications(
id SERIAL PRIMARY KEY,
user_id INT REFERENCES users(id) ON DELETE CASCADE,
message VARCHAR(250),
is_read BOOLEAN DEFAULT false,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`

export const savedJobsTable = `
CREATE TABLE IF NOT EXISTS saved_jobs(
id SERIAL PRIMARY KEY,
user_id INT REFERENCES users(id) ON DELETE CASCADE,
job_id INT REFERENCES jobs(id) ON DELETE CASCADE,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`

export const addRoleConstraint = `
ALTER TABLE users
ADD CONSTRAINT role_check 
CHECK (role IN ('job_seeker', 'employer'))
`

export const addExperienceLevelConstraint = `
ALTER TABLE jobs
ADD CONSTRAINT experience_leve_check
CHECK (experience_level IN ('junior', 'mid', 'senior'))
`

export const addEmploymentTypeConstraint = `
ALTER TABLE jobs
ADD CONSTRAINT employment_type_check
CHECK (employment_type IN ('full-time', 'part-time', 'secondment'))
`

export const addVisaTypeConstraint = `
ALTER TABLE jobs
ADD CONSTRAINT visa_type_check
CHECK (visa_type IN ('Skilled Worker', 'Health and Care Worker'))
`

export const addUpdatedAtToUsers = `
ALTER TABLE users
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
`

export const addUpdatedAtToJobs = `
ALTER TABLE jobs
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
`

export const addUpdatedAtToApplications = `
ALTER TABLE applications
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
`

export const addUpdatedAtToEmployerProfile = `
ALTER TABLE employer_profile
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
`

