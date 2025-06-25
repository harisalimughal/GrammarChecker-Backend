const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors(
  {
    origin: ['http://localhost:3000', 'https://grammar-checker-frontend-git-main-harisalimughals-projects.vercel.app/'],
    credentials: true
  }
));
app.use(express.json());

// Simple in-memory user storage 
const users = [
  {
    id: 1,
    username: 'admin',
    password: bcrypt.hashSync('password', 10) // hashed version of 'password'
  },
  {
    id: 2,
    username: 'user',
    password: bcrypt.hashSync('123456', 10) // hashed version of '123456'
  }
];

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET;

// OpenAI Configuration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY 
});

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Routes
// Login endpoint
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    // Find user
    const user = users.find(u => u.username === username);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, username: user.username }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Grammar check endpoint
app.post('/check-grammar', authenticateToken, async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim().length === 0) {
      return res.status(400).json({ error: 'Text is required' });
    }

    // Call OpenAI API for grammar checking
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a grammar and spelling checker. Analyze the given text and return a JSON response with the following structure:
          {
            "corrections": [
              {
                "word": "incorrect_word",
                "suggestion": "correct_word",
                "start": start_position,
                "end": end_position,
                "type": "spelling" or "grammar"
              }
            ],
            "corrected_text": "fully corrected version of the text"
          }
          Only return the JSON, no additional text.`
        },
        {
          role: "user",
          content: `Check this text: "${text}"`
        }
      ],
      temperature: 0.1
    });

    let result;
    try {
      result = JSON.parse(completion.choices[0].message.content);
    } catch (parseError) {
      // Fallback if OpenAI doesn't return valid JSON
      result = {
        corrections: [],
        corrected_text: text
      };
    }

    res.json(result);
  } catch (error) {
    console.error('Grammar check error:', error);
    res.status(500).json({ error: 'Failed to check grammar' });
  }
});

// backend check
app.get('/', (req, res) => {
  res.send('GrammarChecker Backend is running 🚀');
});


// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});