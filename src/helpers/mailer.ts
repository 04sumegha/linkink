import nodemailer from 'nodemailer';
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs';

export const sendEmail = async({email, userId}:any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        await User.findByIdAndUpdate(userId, {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000})

        var transport = nodemailer.createTransport({
            host: "smtp.forwardemail.net", //change this
            port: 465, //change this
            auth: {
              user: "", // change this
              pass: "" //change this
            }
          });

        const mailOptions = {
            from: 'abc@gmail.com', //change this
            to: email,
            subject: "Verify your email",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> 
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`
        }

        const mailresponse = await transport.sendMail(mailOptions);

        return mailresponse;
    } 
    
    catch (error:any) {
        throw new Error(error.message);
    }
}