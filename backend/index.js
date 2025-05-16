// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Create Express app
const app = express();
app.use(cors());
app.use(express.json());

// Connect to local MongoDB
mongoose.connect('mongodb://localhost:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create Schema & Model
const EntrySchema = new mongoose.Schema({
  activity: String,
  focus: Number,
  tag: String,
  timestamp: String,
});

const Entry = mongoose.model('Entry', EntrySchema);

// POST /submit: Save time entry
app.post('/submit', async (req, res) => {
  const { activity, focus, tag, timestamp } = req.body;
  try {
    const entry = new Entry({ activity, focus, tag, timestamp });
    await entry.save();
    res.status(200).json({ message: 'Entry saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save entry' });
  }
});

// GET /entries: Fetch all entries (optional)
app.get('/entries', async (req, res) => {
  const entries = await Entry.find();
  res.json(entries);
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
