import nodemailer from 'nodemailer';

export default async function sendEmail(
  to: string,
  subject: string,
  text: string,
  html?: string
) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  const mailOptions = {
    from: process.env.SMTP_USER,
    to,
    subject,
    text,
    html
  };

  await transporter.sendMail(mailOptions);
}
