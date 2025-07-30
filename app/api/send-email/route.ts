import { type NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"SAEMA Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.RECIPIENT_EMAIL || process.env.EMAIL_USER,
      subject: "New Contact Form Submission - SAEMA",
      html: `
      <div style="font-family: 'Segoe UI', Roboto, sans-serif; background-color: #0f0f1a; padding: 32px; color: #ffffff; max-width: 600px; margin: 0 auto; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.3);">
        
        <div style="text-align: center; margin-bottom: 32px;">
           <img src="${process.env.FRONTEND_URL}/images/saema-logo.png" alt="SAEMA Logo" style="height: 60px; margin-bottom: 16px;" />
          <h2 style="margin: 0; font-size: 24px; background: linear-gradient(to right, #7F5AF0, #9059FF); -webkit-background-clip: text; color: transparent;">
            New Contact Message from SAEMA Website
          </h2>
        </div>

        <div style="background-color: #1c1c2b; padding: 24px; border-radius: 12px;">
          <h3 style="color: #A78BFA; border-bottom: 1px solid #7F5AF0; padding-bottom: 8px; margin-bottom: 16px;">
            Contact Information
          </h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>

          <h3 style="color: #A78BFA; border-bottom: 1px solid #7F5AF0; padding-bottom: 8px; margin-top: 24px; margin-bottom: 16px;">
            Message
          </h3>
          <p style="white-space: pre-wrap; line-height: 1.6; color: #e0e0e0;">${message}</p>
        </div>

        <div style="text-align: center; font-size: 12px; color: #999; margin-top: 24px;">
          This message was sent from the SAEMA website contact form.<br/>
          Simplify. Automate. Succeed.
        </div>
      </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
