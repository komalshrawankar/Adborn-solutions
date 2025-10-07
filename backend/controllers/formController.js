import Form from "../models/Form.js";
import nodemailer from "nodemailer";
import validator from "validator"; // For input validation

export const submitForm = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, message } = req.body;

    // ✅ Input Validation
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

    if (phone && !validator.isMobilePhone(phone, "any")) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number.",
      });
    }

    // ✅ Save to MongoDB
    const newForm = new Form({ firstName, lastName, email, phone, message });
    await newForm.save();

    // ✅ Create transporter per request
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // 16-character App Password
      },
    });

    // ✅ Send HTML email notification to admin
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: "New Website Form Submission",
      html: `
        <h2>New Form Submission</h2>
        <p><strong>First Name:</strong> ${firstName}</p>
        <p><strong>Last Name:</strong> ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Message:</strong> ${message}</p>
        <p><em>Submitted on ${new Date().toLocaleString()}</em></p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "Form submitted successfully!",
    });

  } catch (error) {
    console.error("Form submission error:", error);
    res.status(500).json({
      success: false,
      message: "Server error!",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
