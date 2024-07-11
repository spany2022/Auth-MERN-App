const ContactMessage = require("../Models/ContactMessage");


const contact = async (req, res) => {
    const { email, subject, message } = req.body;
  
    try {
      const contactMessage = new ContactMessage({
        email,
        subject,
        message,
        user: req.user._id
      });
  
      await contactMessage.save();
  
      res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to send message', error });
    }
  }

module.exports = contact;