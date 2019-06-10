require('dotenv').config()
const {GMAIL_USER, GMAIL_PASS} = process.env
const nodemailer = require('nodemailer')
module.exports = {
    sendEmail: (req, res)=> {
        const {company_name, user_email, text} = req.body
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: GMAIL_USER, 
                pass: GMAIL_PASS
            }
        })
        const mailOptions = {
            from: `"${company_name} via Pitch Vivid" ${GMAIL_USER}`,
            to: `${user_email}`,
            subject: `Your Video Resume for ${company_name} Has Been Reviewed`,
            html: `${text}`
        }
        transporter.sendMail(mailOptions, err=> {
            err ?
            res.status(500).send(console.log(`There was an error sending the email: ${err}`))
            : 
            console.log(`Email sent successfully`)
        })
        res.sendStatus(200)
    },
    resetPassword: (req, res) => {
        const {user_email, text} = req.body
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: GMAIL_USER, 
                pass: GMAIL_PASS
            }
        })
        const mailOptions = {
            from: `"Pitch Vivid" ${GMAIL_USER}`,
            to: `${user_email}`,
            subject: `Your Temporary Password for PitchVivid`,
            html: `${text}`
        }
        transporter.sendMail(mailOptions, err=> {
            err ?
            res.status(500).send(console.log(`There was an error sending the email: ${err}`))
            : 
            console.log(`Email sent successfully`)
        })
        res.sendStatus(200)
    }
}