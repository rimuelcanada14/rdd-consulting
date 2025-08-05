import nodemailer from 'nodemailer';

export async function handler(event, context) {
  // Add CORS headers for all responses
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
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

    // Validate required fields
    if (!fullName || !email || !inquiry || !message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields: fullName, email, inquiry, and message are required.' }),
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid email format.' }),
      };
    }

    // Create transporter
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Verify transporter configuration
    try {
      await transporter.verify();
    } catch (verifyError) {
      console.error('SMTP configuration error:', verifyError);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Email service configuration error.' }),
      };
    }

    const currentDate = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Manila',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    // Internal notification email (to your team)
    const internalMailOptions = {
      from: `"Riego de Dios Consulting" <${process.env.SMTP_USER}>`,
      to: 'rimuelcanada@gmail.com',
      subject: `New Inquiry from ${fullName}`,
      html: `
        <h2>New Inquiry Submitted</h2>
        <p>A new inquiry has been submitted through the website.</p>
        
        <h3>Inquiry Details:</h3>
        <ul>
          <li><strong>Name:</strong> ${fullName}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Phone Number:</strong> ${contactNumber || 'Not provided'}</li>
          <li><strong>Preferred Contact:</strong> ${preferredContact || 'Not specified'}</li>
          <li><strong>Inquiry Type:</strong> ${inquiry}</li>
          <li><strong>Message:</strong></li>
        </ul>
        <blockquote style="border-left: 4px solid #ccc; margin: 1em 0; padding-left: 1em; color: #666;">
          ${message}
        </blockquote>
        
        <p><strong>Receive Updates:</strong> ${receiveUpdates ? 'Yes' : 'No'}</p>
        <p><strong>Submitted on:</strong> ${currentDate}</p>
        
        <hr>
        <p><em>Please assign this inquiry to the appropriate team member for follow-up.</em></p>
      `,
      text: `New Inquiry Submitted

A new inquiry has been submitted through the website.

Inquiry Details:
* Name: ${fullName}
* Email: ${email}
* Phone Number: ${contactNumber || 'Not provided'}
* Preferred Contact: ${preferredContact || 'Not specified'}
* Inquiry Type: ${inquiry}
* Message: ${message}
* Receive Updates: ${receiveUpdates ? 'Yes' : 'No'}
* Submitted on: ${currentDate}

Please assign this inquiry to the appropriate team member for follow-up.`,
    };

    // User confirmation email
    const userConfirmationMailOptions = {
      from: `"Riego de Dios Consulting" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Riego de Dios Consulting - Confirmation',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Thank you for contacting Riego de Dios Consulting</h2>
          
          <p>Dear ${fullName},</p>
          
          <p>Thank you for contacting us. We have received your inquiry and will be reviewing it shortly. Our team will get back to you within 1 business day.</p>
          
          <h3 style="color: #333;">For your reference, here are the details you submitted:</h3>
          <ul>
            <li><strong>Name:</strong> ${fullName}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Phone Number:</strong> ${contactNumber || 'Not provided'}</li>
            <li><strong>Inquiry Type:</strong> ${inquiry}</li>
            <li><strong>Message:</strong></li>
          </ul>
          <blockquote style="border-left: 4px solid #007bff; margin: 1em 0; padding-left: 1em; color: #666; font-style: italic;">
            ${message}
          </blockquote>
          
          <p>We appreciate your interest in our services.</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p><strong>Sincerely,</strong><br>
            The Team<br>
            <a href="mailto:info@riegodedios.com">info@riegodedios.com</a><br>
            09178790029</p>
          </div>
        </div>
      `,
      text: `Dear ${fullName},

Thank you for contacting us. We have received your inquiry and will be reviewing it shortly. Our team will get back to you within 1 business day.

For your reference, here are the details you submitted:
* Name: ${fullName}
* Email: ${email}
* Phone Number: ${contactNumber || 'Not provided'}
* Inquiry Type: ${inquiry}
* Message: ${message}

We appreciate your interest in our services.

Sincerely,
The Team
info@riegodedios.com
09178790029`,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(internalMailOptions),
      transporter.sendMail(userConfirmationMailOptions),
    ]);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        message: 'Thank you for your inquiry! We have received your message and will get back to you within 1 business day.',
        success: true 
      }),
    };

  } catch (error) {
    console.error('Error processing contact form:', error);
    
    // Don't expose internal error details to client
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'We apologize, but there was an issue processing your request. Please try again later or contact us directly.',
        success: false 
      }),
    };
  }
}