const Contact = require('../models/Contact');

exports.addMessage = async (req, res) => {
  try {
    const msg = new Contact(req.body);
    await msg.save();
    res.json({ message: 'Message sent', msg });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
