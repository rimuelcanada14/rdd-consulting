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

    // Only require essential fields - message is now optional
    if (!fullName || !email || !inquiry) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields: Full Name, Email, and Inquiry Type are required.' }),
      };
    }

    // Helper function to convert boolean to Yes/No
    const formatYesNo = (value) => {
      if (value === true) return 'Yes';
      if (value === false) return 'No';
      return 'N/A';
    };

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
      to: ['rimuelcanada@gmail.com', 'canadarimuel@gmail.com'],
      subject: `New Inquiry from ${fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px;">
          <p>A new inquiry has been submitted through the website.</p>
          
          <h3 style="color: black; margin-top: 25px; padding-bottom: 5px;">Inquiry Details:</h3>
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
              <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Preferred Contact Method:</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${preferredContact || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Inquiry Type:</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${inquiry}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold; vertical-align: top;">Message:</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${message || 'No additional message provided'}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold; vertical-align: top;">Receive Updates:</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${formatYesNo(receiveUpdates)}</td>
            </tr>
          </table>
          
          <p style="margin-top: 25px; color: #555;">Please assign this inquiry to the appropriate team member for follow-up.</p>
        </div>
      `,
      text: `A new inquiry has been submitted through the website.

Inquiry Details:
Name: ${fullName}
Email: ${email}
Phone Number: ${contactNumber || 'N/A'}
Preferred Contact Method: ${preferredContact || 'N/A'}
Inquiry Type: ${inquiry}
Message: ${message || 'No additional message provided'}
Receive Updates: ${formatYesNo(receiveUpdates)}

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
          
          <h3 style="color: black; margin-top: 25px; padding-bottom: 5px;">For your reference, here are the details you submitted:</h3>
          
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
              <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Preferred Contact Method:</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${preferredContact || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Inquiry Type:</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${inquiry}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold; vertical-align: top;">Message:</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${message || 'No additional message provided'}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold; vertical-align: top;">Receive Updates:</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${formatYesNo(receiveUpdates)}</td>
            </tr>
          </table>
          
          <p style="margin-top: 25px;">We appreciate your interest in our services.</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="margin: 0; color: #2c3e50;"><strong>Best regards,</strong></p>
            <p style="margin: 5px 0; color: #2c3e50; font-weight: bold;">The Riego de Dios Consulting Team</p>
            <p style="margin: 0; color: #666;">
              Email: <a href="mailto:Info@riegodedios.com" style="color: #3498db; text-decoration: none;">Info@riegodedios.com</a><br>
              Phone: <span style="color: #666;">09178790029</span>
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
Preferred Contact Method: ${preferredContact || 'N/A'}
Inquiry Type: ${inquiry}
Message: ${message || 'No additional message provided'}
Receive Updates: ${formatYesNo(receiveUpdates)}

We appreciate your interest in our services.

Best regards,
The Riego de Dios Consulting Team
Email: info@riegodedios.com
Phone: 09178790029`,
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