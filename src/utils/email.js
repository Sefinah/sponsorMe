import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST, 
    service: process.env.EMAIL_SERVICE,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
})


transporter.verify((error,success)=>{
    if (error){
        console.log("smtp connection error", error)
    }else {
        console.log("smtp connection successful")
    }
})

export const sendEmployerWelcomeEmail = async (userEmail, firstName) =>{
   try {
     const mailOptions = {
        from: "mobisola59.ms@gmail.com",
        to: userEmail,
        subject: "welcome to sponsorMe",
        html: `
        <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Welcome to SponsorMe</title>
  <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet"/>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #FFF8E7; font-family: 'DM Sans', sans-serif; padding: 2rem 1rem; }
    .email-wrap { max-width: 560px; margin: 0 auto; }
    .email-card { background: #ffffff; border: 0.5px solid #FAC775; border-radius: 12px; overflow: hidden; }

    /* Header */
    .email-header { background: #EF9F27; padding: 2.5rem 2rem 2rem; position: relative; overflow: hidden; }
    .email-header::before { content: ''; position: absolute; top: -40px; right: -40px; width: 180px; height: 180px; border-radius: 50%; background: rgba(255,255,255,0.12); }
    .email-header::after { content: ''; position: absolute; bottom: -60px; left: 60px; width: 140px; height: 140px; border-radius: 50%; background: rgba(255,255,255,0.08); }
    .email-logo { display: flex; align-items: center; gap: 10px; margin-bottom: 1.75rem; position: relative; z-index: 1; }
    .logo-dot { width: 28px; height: 28px; border-radius: 50%; background: #fff; display: flex; align-items: center; justify-content: center; font-size: 14px; color: #EF9F27; font-weight: 700; }
    .logo-text { color: #412402; font-size: 15px; font-weight: 500; }
    .hero-tag { display: inline-block; background: rgba(255,255,255,0.25); color: #412402; font-size: 11px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; padding: 4px 10px; border-radius: 100px; margin-bottom: 1rem; border: 0.5px solid rgba(255,255,255,0.4); position: relative; z-index: 1; }
    .hero-title { font-family: 'DM Serif Display', serif; color: #412402; font-size: 28px; font-weight: 400; margin: 0 0 0.4rem; line-height: 1.2; position: relative; z-index: 1; }
    .hero-sub { color: #633806; font-size: 14px; margin: 0; position: relative; z-index: 1; }

    /* Body */
    .email-body { padding: 2rem; background: #FAEEDA; }
    .greeting { font-size: 15px; color: #633806; margin: 0 0 1.25rem; }
    .greeting strong { color: #412402; font-weight: 500; }
    .main-msg { font-size: 15px; color: #412402; line-height: 1.7; margin: 0 0 2rem; }

    /* Feature cards */
    .features { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 2rem; }
    .feat-card { background: #fff; border: 0.5px solid #FAC775; border-radius: 8px; padding: 14px 16px; display: flex; align-items: flex-start; gap: 10px; }
    .feat-icon { width: 32px; height: 32px; border-radius: 8px; background: #EF9F27; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 16px; }
    .feat-label { font-size: 13px; font-weight: 500; color: #412402; margin: 0 0 2px; }
    .feat-desc { font-size: 12px; color: #854F0B; margin: 0; line-height: 1.4; }

    /* CTA */
    .cta-btn { display: block; background: #412402; color: #FAC775; text-decoration: none; text-align: center; font-size: 14px; font-weight: 500; padding: 13px 24px; border-radius: 8px; margin-bottom: 2rem; letter-spacing: 0.01em; }

    /* Footer */
    .email-divider { border: none; border-top: 0.5px solid #FAC775; margin: 0 0 1.5rem; }
    .email-footer { padding: 0 2rem 2rem; background: #FAEEDA; }
    .sign-off { font-size: 14px; color: #854F0B; margin: 0 0 0.25rem; }
    .sign-name { font-size: 14px; font-weight: 500; color: #412402; margin: 0; }
    .footer-meta { background: #FAC775; padding: 1rem 2rem; font-size: 12px; color: #633806; line-height: 1.6; }
    .footer-meta a { color: #412402; }
  </style>
</head>
<body>
  <div class="email-wrap">
    <div class="email-card">

      <!-- Header -->
      <div class="email-header">
        <div class="email-logo">
          <div class="logo-dot">S</div>
          <span class="logo-text">SponsorMe</span>
        </div>
        <div class="hero-tag">Account activated</div>
        <h1 class="hero-title">You're all set. </h1>
        <p class="hero-sub">Welcome to SponsorMe — let's find great talent</p>
      </div>

      <!-- Body -->
      <div class="email-body">
        <p class="greeting">Hi <strong>${firstName}</strong>,</p>
        <p class="main-msg">Your account is ready. You can now post jobs and connect with talented professionals actively seeking visa-sponsored roles.</p>

        <div class="features">
          <div class="feat-card">
            <div class="feat-icon">📋</div>
            <div>
              <p class="feat-label">Post jobs</p>
              <p class="feat-desc">Reach sponsored-role candidates instantly</p>
            </div>
          </div>
          <div class="feat-card">
            <div class="feat-icon">👥</div>
            <div>
              <p class="feat-label">Browse talent</p>
              <p class="feat-desc">Filter by skills, location & visa type</p>
            </div>
          </div>
          <div class="feat-card">
            <div class="feat-icon">💬</div>
            <div>
              <p class="feat-label">Message directly</p>
              <p class="feat-desc">Start conversations with top applicants</p>
            </div>
          </div>
          <div class="feat-card">
            <div class="feat-icon">📊</div>
            <div>
              <p class="feat-label">Track listings</p>
              <p class="feat-desc">Monitor views, clicks & applications</p>
            </div>
          </div>
        </div>

        <a href="#" class="cta-btn">Go to your dashboard →</a>
      </div>

      <hr class="email-divider" />

      <!-- Sign-off -->
      <div class="email-footer">
        <p class="sign-off">Warm regards,</p>
        <p class="sign-name">The SponsorMe Team</p>
      </div>

      <!-- Footer meta -->
      <div class="footer-meta">
        You're receiving this because you created a SponsorMe account. &nbsp;·&nbsp;
        <a href="#">Unsubscribe</a> &nbsp;·&nbsp;
        <a href="#">Privacy policy</a>
      </div>

    </div>
  </div>
</body>
</html>
        `
    }
    await transporter.sendMail(mailOptions)
   } catch (error) {
    console.log(error)
    throw error
   }

}


export const sendSeekerWelcomeEmail = async (userEmail, firstName)=>{
  try {
    const mailOptions = {
    from: "mobisola59.ms@gmail.com",
        to: userEmail,
        subject: "welcome to sponsorMe",
        html: `
          <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Welcome to SponsorMe</title>
  <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet"/>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #FFF8E7; font-family: 'DM Sans', sans-serif; padding: 2rem 1rem; }
    .email-wrap { max-width: 560px; margin: 0 auto; }
    .email-card { background: #ffffff; border: 0.5px solid #FAC775; border-radius: 12px; overflow: hidden; }

    .email-header { background: #EF9F27; padding: 2.5rem 2rem 2rem; position: relative; overflow: hidden; }
    .email-header::before { content: ''; position: absolute; top: -40px; right: -40px; width: 180px; height: 180px; border-radius: 50%; background: rgba(255,255,255,0.12); }
    .email-header::after { content: ''; position: absolute; bottom: -60px; left: 60px; width: 140px; height: 140px; border-radius: 50%; background: rgba(255,255,255,0.08); }
    .email-logo { display: flex; align-items: center; gap: 10px; margin-bottom: 1.75rem; position: relative; z-index: 1; }
    .logo-dot { width: 28px; height: 28px; border-radius: 50%; background: #fff; display: flex; align-items: center; justify-content: center; font-size: 14px; color: #EF9F27; font-weight: 700; }
    .logo-text { color: #412402; font-size: 15px; font-weight: 500; }
    .hero-tag { display: inline-block; background: rgba(255,255,255,0.25); color: #412402; font-size: 11px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; padding: 4px 10px; border-radius: 100px; margin-bottom: 1rem; border: 0.5px solid rgba(255,255,255,0.4); position: relative; z-index: 1; }
    .hero-title { font-family: 'DM Serif Display', serif; color: #412402; font-size: 28px; font-weight: 400; margin: 0 0 0.4rem; line-height: 1.2; position: relative; z-index: 1; }
    .hero-sub { color: #633806; font-size: 14px; margin: 0; position: relative; z-index: 1; }

    .email-body { padding: 2rem; background: #FAEEDA; }
    .greeting { font-size: 15px; color: #633806; margin: 0 0 1.25rem; }
    .greeting strong { color: #412402; font-weight: 500; }
    .main-msg { font-size: 15px; color: #412402; line-height: 1.7; margin: 0 0 2rem; }

    .features { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 2rem; }
    .feat-card { background: #fff; border: 0.5px solid #FAC775; border-radius: 8px; padding: 14px 16px; display: flex; align-items: flex-start; gap: 10px; }
    .feat-icon { width: 32px; height: 32px; border-radius: 8px; background: #EF9F27; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 16px; }
    .feat-label { font-size: 13px; font-weight: 500; color: #412402; margin: 0 0 2px; }
    .feat-desc { font-size: 12px; color: #854F0B; margin: 0; line-height: 1.4; }

    .tip-box { background: #fff; border-left: 3px solid #EF9F27; border-radius: 0 8px 8px 0; padding: 14px 16px; margin-bottom: 2rem; }
    .tip-label { font-size: 11px; font-weight: 500; color: #EF9F27; text-transform: uppercase; letter-spacing: 0.07em; margin: 0 0 4px; }
    .tip-text { font-size: 13px; color: #633806; margin: 0; line-height: 1.5; }

    .cta-btn { display: block; background: #412402; color: #FAC775; text-decoration: none; text-align: center; font-size: 14px; font-weight: 500; padding: 13px 24px; border-radius: 8px; margin-bottom: 2rem; letter-spacing: 0.01em; }

    .email-divider { border: none; border-top: 0.5px solid #FAC775; margin: 0 0 1.5rem; }
    .email-footer { padding: 0 2rem 2rem; background: #FAEEDA; }
    .sign-off { font-size: 14px; color: #854F0B; margin: 0 0 0.25rem; }
    .sign-name { font-size: 14px; font-weight: 500; color: #412402; margin: 0; }
    .footer-meta { background: #FAC775; padding: 1rem 2rem; font-size: 12px; color: #633806; line-height: 1.6; }
    .footer-meta a { color: #412402; }
  </style>
</head>
<body>
  <div class="email-wrap">
    <div class="email-card">

      <!-- Header -->
      <div class="email-header">
        <div class="email-logo">
          <div class="logo-dot">S</div>
          <span class="logo-text">SponsorMe</span>
        </div>
        <div class="hero-tag">Profile activated</div>
        <h1 class="hero-title">Your next role is out there. 🌍</h1>
        <p class="hero-sub">Welcome to SponsorMe — sponsored jobs, matched to you</p>
      </div>

      <!-- Body -->
      <div class="email-body">
        <p class="greeting">Hi <strong>${firstName}</strong>,</p>
        <p class="main-msg">Your profile is live. Employers who offer visa sponsorship can now discover you — and you can start browsing and applying to sponsored roles right away.</p>

        <div class="features">
          <div class="feat-card">
            <div class="feat-icon">🔍</div>
            <div>
              <p class="feat-label">Browse jobs</p>
              <p class="feat-desc">Filter by role, location & visa type</p>
            </div>
          </div>
          <div class="feat-card">
            <div class="feat-icon">📄</div>
            <div>
              <p class="feat-label">Build your profile</p>
              <p class="feat-desc">Showcase skills, experience & visa needs</p>
            </div>
          </div>
          <div class="feat-card">
            <div class="feat-icon">🔔</div>
            <div>
              <p class="feat-label">Job alerts</p>
              <p class="feat-desc">Get notified when new matches appear</p>
            </div>
          </div>
          <div class="feat-card">
            <div class="feat-icon">💬</div>
            <div>
              <p class="feat-label">Hear from employers</p>
              <p class="feat-desc">Sponsors reach out directly to you</p>
            </div>
          </div>
        </div>
        <a href="#" class="cta-btn">Complete your profile →</a>
      </div>

      <hr class="email-divider" />

      <!-- Sign-off -->
      <div class="email-footer">
        <p class="sign-off">Good luck out there,</p>
        <p class="sign-name">The SponsorMe Team</p>
      </div>

      

    </div>
  </div>
</body>
</html>
        ` 
  }
  await transporter.sendMail(mailOptions)
  } catch (error) {
    console.log(error)
    throw error
  }
}