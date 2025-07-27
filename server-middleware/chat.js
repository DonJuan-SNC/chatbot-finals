const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')

const app = express()
app.use(bodyParser.json())

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY
const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1/chat/completions'

// Predefined local responses
const predefinedReplies = {
  hello: 'Hi! How can I assist you today?',
  schedule: 'You can schedule a service via our calendar.',
  location: 'We are located at San Fernando, Pampanga.',
  contact: 'You may reach us at 0999-123-4567.',
}

app.post('/', async (req, res) => {
  const { message } = req.body
  const key = message.toLowerCase().trim()

  // Check predefined responses first
  if (predefinedReplies[key]) {
    return res.json({ reply: predefinedReplies[key] })
  }

  // Use OpenRouter if no predefined match
  try {
    const response = await axios.post(
      OPENROUTER_BASE_URL,
      {
        model: 'openai/gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant for a funeral and cemetery service platform called "Beyond the Grave".'
          },
          {
            role: 'user',
            content: message
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    )

    const aiReply = response.data.choices[0]?.message?.content || 'I am here to help.'
    res.json({ reply: aiReply })
  } catch (err) {
    console.error('AI error:', err?.response?.data || err.message)
    res.json({ reply: 'Sorry, I could not process your request right now.' })
  }
})

module.exports = app
