const path = require("path");
const ejs = require("ejs");
const { sendEmail } = require("../services/mailService");

exports.handleContactForm = async (req, res) => {
  try {
    const { name, email, phone, eventType, message } = req.body;

    // Render the EJS template with user data
    const html = await ejs.renderFile(
      path.join(__dirname, "../views/emails/contact.ejs"),
      { name, email, phone, eventType, message }
    );
    // info.abhinayrai@gmail.com
    // info.abhinayrai@gmail.com
    // Send the email
    await sendEmail({
      to: "abhishek.rai8280@gmail.com",
      subject: `New Contact from ${name}`,
      html,
    });

    res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Email Error:", error);
    res.status(500).json({ error: "Failed to send message." });
  }
};
