import nodemailer from 'nodemailer'

export const sendEmail = async (data, req, res, next)=>{
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        }
    })

    const info = await transporter.sendMail({
        from: '"Admin" <admin@jjecommerce.com>', // sender address
        to: data.to, // list of receivers
        subject: data.subject, // Subject line
        text: data.text, // plain text body
        html: data.htm, // html body
    })  

    console.log("Message sent: %s", info.messageId)
}