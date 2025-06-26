const express = require('express');
const router = express.Router();
const openai = require('../config/openai');
const authenticateToken = require('../middleware/auth');

router.post('/', authenticateToken, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || text.trim().length === 0) {
      return res.status(400).json({ error: 'Text is required' });
    }
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a grammar and spelling checker. Analyze the given text and return a JSON response with the following structure:\n          {\n            \"corrections\": [\n              {\n                \"word\": \"incorrect_word\",\n                \"suggestion\": \"correct_word\",\n                \"start\": start_position,\n                \"end\": end_position,\n                \"type\": \"spelling\" or \"grammar\"\n              }\n            ],\n            \"corrected_text\": \"fully corrected version of the text\"\n          }\n          Only return the JSON, no additional text.`
        },
        {
          role: "user",
          content: `Check this text: \"${text}\"`
        }
      ],
      temperature: 0.1
    });
    let result;
    try {
      result = JSON.parse(completion.choices[0].message.content);
    } catch (parseError) {
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

module.exports = router; 