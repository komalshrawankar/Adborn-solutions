import CareerForm from "../models/CareerForm.js";
import nodemailer from "nodemailer";

export const submitCareerForm = async (req, res) => {
  try {
    const formData = req.body;

    // 1️⃣ Save applicant to MongoDB
    const newApplication = await CareerForm.create(formData);
    console.log("✅ Application saved:", newApplication);

    // 2️⃣ Configure Nodemailer
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER, // sender email
        pass: process.env.EMAIL_PASS, // app password
      },
    });

    // 3️⃣ Email to applicant
    try {
      const applicantMailOptions = {
        from: process.env.EMAIL_USER,
        to: newApplication.email,
        subject: "Application Received - Adborn Solutions",
        html: `
          <p>Hi ${newApplication.firstName || "Applicant"},</p>
          <p>We have received your application for <b>${newApplication.position || "the role"}</b> at Adborn Solutions.</p>
          <p>We will get back to you soon.</p>
          <br>
          <p>Best regards,</p>
          <p><b>Adborn Solutions Team</b></p>
        `,
      };

      const applicantInfo = await transporter.sendMail(applicantMailOptions);
      console.log("✅ Email sent to applicant:", applicantInfo.accepted);
    } catch (err) {
      console.error("❌ Failed to send email to applicant:", err);
    }

    // 4️⃣ Email to admin
    try {
      const adminMailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL,
        subject: "New Application Submitted",
        html: `
          <h3>New Application Received</h3>
          <p><strong>Name:</strong> ${newApplication.firstName || "N/A"} ${newApplication.lastName || "N/A"}</p>
          <p><strong>Email:</strong> ${newApplication.email || "N/A"}</p>
          <p><strong>Phone:</strong> ${newApplication.phone || "N/A"}</p>
          <p><strong>Position:</strong> ${newApplication.position || "N/A"}</p>
          <p><strong>Portfolio:</strong> ${newApplication.portfolioLink || "N/A"}</p>
          <p><strong>Resume:</strong> ${newApplication.resumeLink || "N/A"}</p>
          <p><em>Submitted on ${new Date().toLocaleString()}</em></p>
        `,
      };

      const adminInfo = await transporter.sendMail(adminMailOptions);
      console.log("✅ Email sent to admin:", adminInfo.accepted);
    } catch (err) {
      console.error("❌ Failed to send email to admin:", err);
    }

    // 5️⃣ Send success response to frontend
    res.status(201).json({ message: "Application submitted successfully!" });

  } catch (error) {
    console.error("❌ Career form error:", error);
    res.status(500).json({ message: "Error submitting form", error: error.message });
  }
};
