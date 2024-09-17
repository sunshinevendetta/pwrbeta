import nodemailer from 'nodemailer';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

export async function POST(req) {
  const { name, email, subject, message, captcha } = await req.json();

  // Verify reCAPTCHA
  const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captcha}`, {
    method: 'POST',
  });
  const captchaValidation = await response.json();

  if (!captchaValidation.success) {
    return new Response(JSON.stringify({ status: 'CAPTCHA validation failed' }), { status: 400 });
  }

  // Path to the HTML template
  const templatePath = path.join(process.cwd(), 'src/templates/mail.html');

  // Read the HTML template
  let emailHtml;
  try {
    emailHtml = fs.readFileSync(templatePath, 'utf-8');
  } catch (err) {
    console.error('Error reading HTML template:', err);
    return new Response(JSON.stringify({ status: 'Error reading email template' }), { status: 500 });
  }

  // Replace placeholders in the HTML template
  emailHtml = emailHtml.replace('{{name}}', name); // Personalize with the name
  emailHtml = emailHtml.replace('{{bannerUrl}}', 'https://pwr2tp.mx/assets/imagen.png'); // Replace with the actual URL for the banner image
  emailHtml = emailHtml.replace('{{calendarLinkUrl}}', 'https://pwr2tp.mx/assets/power2thepeople2025.ics'); // Link to the .ics file

  const transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru', // Mail.ru SMTP server
    port: 465, // Use 465 for secure connections
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.MAILRU_USER,
      pass: process.env.MAILRU_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <${process.env.MAILRU_USER}>`, // Authenticated Mail.ru email address
      to: process.env.EMAIL_TO, // List of receivers
      replyTo: email, // User's email as the reply-to address
      subject: `New message from ${name} - ${subject}`, // Subject line
      text: message, // Plain text body
      html: emailHtml, // HTML body with dynamic content from the template
    });

    return new Response(JSON.stringify({ status: 'Message sent successfully' }), { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ status: 'Error sending email' }), { status: 500 });
  }
}
