
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// In-memory "database" for demonstration. 
// In a production app, this would be a MongoDB or PostgreSQL database.
let userProfile = null;

// GET the user profile
app.get('/api/profile', (req, res) => {
  if (!userProfile) {
    return res.status(404).json({ message: "No profile found" });
  }
  res.json(userProfile);
});

// POST (Save/Update) the user profile
app.post('/api/profile', (req, res) => {
  const profile = req.body;
  if (!profile || !profile.name) {
    return res.status(400).json({ message: "Invalid profile data" });
  }
  userProfile = {
    ...profile,
    lastUpdated: new Date().toISOString()
  };
  console.log(`Saved progress for: ${userProfile.name}. XP: ${userProfile.xp}`);
  res.json({ success: true, profile: userProfile });
});

app.listen(PORT, () => {
  console.log(`Globey Backend running at http://localhost:${PORT}`);
});
