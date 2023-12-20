import nodemailer from "nodemailer";
import User from "@/models/userModels";
import bcryptjs from "bcryptjs";
import { verify } from "crypto";

interface EmailParams {
  email: string;
  emailType: string;
  userId: string;
}

enum EmailType {
  VERIFY = "verify",
  FORGOT = "forgot",
}
export const sendEmail = async ({ email, emailType, userId }: EmailParams) => {
  try {
    //Hashed User Value
    const hashedUser = await bcryptjs.hash(userId, 10);

    //Handle Email Type
    if (emailType === "verify") {
      //Update User Token And Data
      await User.findByIdAndUpdate(
        { _id: userId },
        { verifyToken: hashedUser, verifyTokenExpiry: Date.now() + 3600000 },
        { upsert: true }
      );
    } else if (emailType === "forgot") {
      //Update User Token And Data
      await User.findByIdAndUpdate(
        { _id: userId },
        { forgotPasswordToken: hashedUser, forgotPasswordTokenExpiry: Date.now() + 3600000 },
        { upsert: true }
      );
    }


    //Handle Email Send
    let transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: process.env.MAILTRAP_USER,
          pass: process.env.MAILTRAP_PASS
        }
      });

      //Email Body
      const emailBody = `<p>
      Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedUser}">Here</a> to verify your email,
      <br/>
      Or Copy and Paste the code into your browser.
      <br/>
      ${process.env.DOMAIN}/verifyemail?token=${hashedUser}
      </p>`

      //Mail Option
      const mailOption = {
        from: "nextauth@temp.com",
        to: email,
        subject: emailType === "verify" ? "Verify Your Email" : "Reset Your Password",
        html: emailBody
        
      }

      const emailResponse = await transport.sendMail(mailOption)
  } catch (error: any) {
    throw new Error(error.message);
  }
};
