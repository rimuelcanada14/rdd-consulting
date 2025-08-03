import dotenv from 'dotenv';
import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false, // true for 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

app.post('/api/sendInquiryEmail', async (req, res) => {
  const {
    fullName,
    email,
    contactNumber,
    preferredContact,
    inquiry,
    message,
    receiveUpdates,
  } = req.body;

  if (!fullName || !email || !inquiry || !message) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  // Email to fixed internal address
  const internalMailOptions = {
    from: `"Riego de Dios Consulting" <${process.env.SMTP_USER}>`,
    to: 'rimuelcanada@gmail.com', // fixed recipient address
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

  // Confirmation email to user
  const userConfirmationMailOptions = {
    from: `"Riego de Dios Consulting" <${process.env.SMTP_USER}>`,
    to: email,  // user entered email
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

  try {
    // Send internal inquiry email first
    await transporter.sendMail(internalMailOptions);
    // Then send confirmation email to user
    await transporter.sendMail(userConfirmationMailOptions);

    res.status(200).json({ message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
