import Form from "../models/Form.js";
import nodemailer from "nodemailer";
import validator from "validator";

export const submitForm = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, message } = req.body;

    // Input validation
    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "First name, last name, email, and message are required.",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format.",
      });
    }

    // Save to DB
    const newForm = new Form({ firstName, lastName, email, phone, message });
    await newForm.save();

    // Transporter Config
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email to Admin
    await transporter.sendMail({
      from: `"Website Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: "New Website Form Submission",
      html: `
        <h2>New Form Submission</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Message:</strong> ${message}</p>
        <p><em>Received on: ${new Date().toLocaleString()}</em></p>
      `,
      replyTo: email,
    });

    // Auto-Response to User
    await transporter.sendMail({
      from: `"Adborn Solutions" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "We Received Your Message!",
      html: `
        <h3>Hello ${firstName} 👋</h3>
        <p>Thank you for contacting <strong>Adborn Solutions</strong>.</p>
        <p>We have received your message and our team will reach out to you shortly.</p>
        <br/>
        <p>Best regards,</p>
        <p><strong>Adborn Solutions Team</strong></p>
      `,
    });

    res.status(200).json({
      success: true,
      message: "Form submitted successfully!",
    });

  } catch (error) {
    console.error("Email sending error:", error);
    res.status(500).json({
      success: false,
      message: "Server error! Please try again later.",
    });
  }
};
