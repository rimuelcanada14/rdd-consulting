import nodemailer from 'nodemailer';

export async function handler(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const data = JSON.parse(event.body);

    const {
      fullName,
      email,
      contactNumber,
      preferredContact,
      inquiry,
      message,
      receiveUpdates,
    } = data;

    if (!fullName || !email || !inquiry || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields.' }),
      };
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const internalMailOptions = {
      from: `"Riego de Dios Consulting" <${process.env.SMTP_USER}>`,
      to: 'rimuelcanada@gmail.com',
      subject: `New Inquiry from ${fullName}`,
      text: `A new inquiry has been submitted through the website.

Inquiry Details:
**Name:** ${fullName}
**Email:** ${email}
**Phone Number:** ${contactNumber || 'N/A'}
**Message:** ${message}

Please assign this inquiry to the appropriate team member for follow-up.`,
    };

    const userConfirmationMailOptions = {
      from: `"Riego de Dios Consulting" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Riego de Dios Consulting - Confirmation`,
      text: `Dear ${fullName},

Thank you for contacting us. We have received your inquiry and will be reviewing it shortly. Our team will get back to you within 1 business day.

For your reference, here are the details you submitted:
**Name:** ${fullName}
**Email:** ${email}
**Phone Number:** ${contactNumber || 'N/A'}
**Message:** ${message}

We appreciate your interest in our services.

Sincerely,
The Team
Info@riegodedios.com
09178790029`,
    };

    await transporter.sendMail(internalMailOptions);
    await transporter.sendMail(userConfirmationMailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Emails sent successfully' }),
    };

  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send email' }),
    };
  }
}