import nodemailer from 'nodemailer'
export const sendEmail=async({to,subject,html})=>{
    const transporter=nodemailer.createTransport({
        host:'localHost',
        port:465,
        service:process.env.SERVICES,
        secure:true,
        auth:{
            user:process.env.EMAIL,
            pass:process.env.PASS
        }
    })

    const info=await transporter.sendMail({
        from:`"Anime App " <${process.env.EMAIL}> `,
        to,
        subject,
        html,
    })
    
    if(info.accepted.length > 0) return true
    return false
}