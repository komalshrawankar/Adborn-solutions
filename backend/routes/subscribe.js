import express from "express";
import Subscriber from "../models/Subscriber.js";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/", async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    // Save to database
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already subscribed!" });
    }

    await Subscriber.create({ email });

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // your email
        pass: process.env.EMAIL_PASS, // app password
      },
    });

    // Email content
    const mailOptions = {
      from: `"Marketing Guide" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Free Marketing Growth Guide",
      html: `
        <h2>Thank you for subscribing!</h2>
        <p>Click the link below to download your guide:</p>
        <a href="https://yourwebsite.com/files/marketing-guide.pdf" target="_blank">Download Now</a>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Email subscribed successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
