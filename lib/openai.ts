import OpenAI from 'openai'

const openaiApiKey = process.env.OPENAI_API_KEY

if (!openaiApiKey) {
  console.warn('OPENAI_API_KEY is not set. AI features will not work.')
}

const openai = openaiApiKey ? new OpenAI({
  apiKey: openaiApiKey,
}) : null


