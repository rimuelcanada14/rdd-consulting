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
      subject: `[${inquiry}] Inquiry for Riego de Dios Consulting - ${fullName}`,
      text: `Full Name: ${fullName}
Email Address: ${email}
Contact Number: ${contactNumber || 'N/A'}
Preferred Contact Method: ${preferredContact || 'N/A'}
Inquiry: ${inquiry}
Message: ${message}
Updates: ${receiveUpdates ? 'Yes' : 'No'}
Submitted on: ${new Date().toLocaleString()}
`,
    };

    const userConfirmationMailOptions = {
      from: `"Riego de Dios Consulting" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Thank you for contacting Riego de Dios Consulting`,
      text: `Dear ${fullName},

Thank you for reaching out to Riego de Dios Consulting. We have received your inquiry:

---
Inquiry Type: ${inquiry}
Message: ${message}

Our team will get back to you as soon as possible.

If you have any further questions or need immediate assistance, please do not hesitate to contact us.

Best regards,
Riego de Dios Consulting Team
`,
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
