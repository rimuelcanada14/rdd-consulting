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
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <p>A new inquiry has been submitted through the website.</p>
          
          <h3 style="color: #2c3e50; margin-top: 20px;">Inquiry Details:</h3>
          <table style="border-collapse: collapse; width: 100%; margin: 15px 0;">
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold; width: 120px;">Name:</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${fullName}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Email:</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Phone Number:</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${contactNumber || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold; vertical-align: top;">Message:</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${message}</td>
            </tr>
          </table>
          
          <p style="margin-top: 20px; color: #555;">Please assign this inquiry to the appropriate team member for follow-up.</p>
        </div>
      `,
      text: `A new inquiry has been submitted through the website.

Inquiry Details:
Name: ${fullName}
Email: ${email}
Phone Number: ${contactNumber || 'N/A'}
Message: ${message}

Please assign this inquiry to the appropriate team member for follow-up.`,
    };

    const userConfirmationMailOptions = {
      from: `"Riego de Dios Consulting" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Riego de Dios Consulting - Confirmation`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px;">
          <p>Dear ${fullName},</p>
          
          <p>Thank you for contacting us. We have received your inquiry and will be reviewing it shortly. Our team will get back to you within <strong>1 business day</strong>.</p>
          
          <h3 style="color: #2c3e50; margin-top: 25px; border-bottom: 2px solid #3498db; padding-bottom: 5px;">For your reference, here are the details you submitted:</h3>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-left: 4px solid #3498db; margin: 20px 0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #2c3e50; width: 120px;">Name:</td>
                <td style="padding: 8px 0;">${fullName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #2c3e50;">Email:</td>
                <td style="padding: 8px 0;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #2c3e50;">Phone Number:</td>
                <td style="padding: 8px 0;">${contactNumber || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #2c3e50; vertical-align: top;">Message:</td>
                <td style="padding: 8px 0; line-height: 1.5;">${message}</td>
              </tr>
            </table>
          </div>
          
          <p style="margin-top: 25px;">We appreciate your interest in our services.</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="margin: 0;"><strong>Sincerely,</strong></p>
            <p style="margin: 5px 0; color: #2c3e50; font-weight: bold;">The Team</p>
            <p style="margin: 0; color: #666;">
              <a href="mailto:Info@riegodedios.com" style="color: #3498db; text-decoration: none;">Info@riegodedios.com</a><br>
              <span style="color: #666;">09178790029</span>
            </p>
          </div>
        </div>
      `,
      text: `Dear ${fullName},

Thank you for contacting us. We have received your inquiry and will be reviewing it shortly. Our team will get back to you within 1 business day.

For your reference, here are the details you submitted:
Name: ${fullName}
Email: ${email}
Phone Number: ${contactNumber || 'N/A'}
Message: ${message}

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