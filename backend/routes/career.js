// routes/career.js
import express from "express";
import nodemailer from "nodemailer";
import Career from "../models/Career.js";

const router = express.Router();

router.post("/apply", async (req, res) => {
  try {
    const { position, firstName, lastName, phone, email, resumeLink, portfolioLink, test, salary, availability } = req.body;

    // Save to MongoDB
    const newApplication = new Career({
      position, firstName, lastName, phone, email,
      resumeLink, portfolioLink, test, salary, availability
    });
    await newApplication.save();

    // Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "komal.adborn9@gmail.com",
        pass: "scjvwtlreobkazxu",
      },
    });

    await transporter.sendMail({
      from: "komal.adborn9@gmail.com",
      to: "komal.adborn9@gmail.com",
      subject: `New Job Application - ${position}`,
      html: `
        <h2>New Job Application</h2>
        <p><b>Name:</b> ${firstName} ${lastName}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Resume:</b> <a href="${resumeLink}">${resumeLink}</a></p>
        <p><b>Portfolio:</b> ${portfolioLink || "N/A"}</p>
        <p><b>Willing to test:</b> ${test}</p>
        <p><b>Salary Expectation:</b> ${salary}</p>
        <p><b>Availability:</b> ${availability}</p>
      `,
    });

    res.status(200).json({ message: "Application submitted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

export default router;
