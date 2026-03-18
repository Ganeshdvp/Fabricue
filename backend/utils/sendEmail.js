import { Resend } from "resend";


// forgot password
export const sendEmail = async (email, otp) => {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data } = await resend.emails.send({
      from: "onboarding@resend.dev", // domain name
      to: email,
      subject: "OTP Verification - Fabricue",
      html: `
  <div style="background-color:#f4f6f8; padding:40px 0; font-family:Arial, sans-serif;">
    <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.08);">
      
      <!-- Header -->
      <tr>
        <td style="background:#0f172a; padding:20px; text-align:center;">
          <h2 style="color:#ffffff; margin:0;">Fabricue</h2>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="padding:40px 30px; text-align:center;">
          <h3 style="margin:0 0 10px; color:#111827;">Verify Your Email</h3>
          <p style="color:#6b7280; font-size:14px; margin-bottom:30px;">
            Use the verification code below to complete your login.  
            This code will expire in <strong>5 minutes</strong>.
          </p>

          <div style="
            display:inline-block;
            padding:15px 30px;
            font-size:28px;
            letter-spacing:8px;
            font-weight:bold;
            background:#f3f4f6;
            color:#111827;
            border-radius:6px;
          ">
            ${otp}
          </div>

          <p style="margin-top:30px; font-size:13px; color:#9ca3af;">
            If you did not request this code, you can safely ignore this email.
          </p>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background:#f9fafb; padding:20px; text-align:center; font-size:12px; color:#9ca3af;">
          © ${new Date().getFullYear()} Fabricue. All rights reserved.
        </td>
      </tr>

    </table>
  </div>
`,
    });

    if (!data) throw new Error("Failed to send OTP to email");

  } catch (error) {
    throw new Error("Failed to send OTP to email");
  }
};

// contact
export const sendContactEmail = async (name, email, message) => {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data } = await resend.emails.send({
      from: "onboarding@resend.dev", // domain name
      to: "ganeshcherupalli6565@gmail.com",
      subject: "New Contact Message - Fabricue",
      html: `
      <div style="background:#f4f6f8; padding:40px 0; font-family:Arial, sans-serif;">
    <table align="center" width="100%" cellpadding="0" cellspacing="0"
      style="max-width:600px; background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.08);">

      <!-- Header -->
      <tr>
        <td style="background:#f59e0b; padding:20px; text-align:center;">
          <h2 style="color:#ffffff; margin:0;">Fabricue Contact Message</h2>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="padding:30px;">
          <h3 style="margin-bottom:20px; color:#111827;">New message received</h3>

          <p style="margin:10px 0; font-size:14px;">
            <strong>Name:</strong> ${name}
          </p>

          <p style="margin:10px 0; font-size:14px;">
            <strong>Email:</strong> ${email}
          </p>

          <p style="margin:10px 0; font-size:14px;">
            <strong>Message:</strong>
          </p>

          <div style="
            background:#f3f4f6;
            padding:15px;
            border-radius:6px;
            font-size:14px;
            color:#374151;
            line-height:1.5;
          ">
            ${message}
          </div>

        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background:#f9fafb; padding:20px; text-align:center; font-size:12px; color:#9ca3af;">
          © ${new Date().getFullYear()} Fabricue. Contact form submission.
        </td>
      </tr>

    </table>
  </div>
`,
    });

    if (!data) throw new Error("Failed to send contact email");

  } catch (error) {
    throw new Error("Failed to send contact email");
  }
};