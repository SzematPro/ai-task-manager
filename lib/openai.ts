import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export interface ProcessedTask {
  title: string
  description?: string
  dueDate?: string
  priority: 'low' | 'medium' | 'high'
  category?: string
}

export async function processNaturalLanguageTask(input: string): Promise<ProcessedTask> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are an AI assistant that processes natural language task descriptions and converts them into structured task data.

Your task is to analyze the user's input and extract:
1. A clear, concise title
2. A description (if needed for clarity)
3. Due date (if mentioned)
4. Priority level (low, medium, high)
5. Category (if inferable)

Rules:
- If no due date is mentioned, don't include one
- If no priority is mentioned, default to 'medium'
- If no category is mentioned, don't include one
- Be conservative with due dates - only extract if clearly mentioned
- Priority should be 'high' for urgent words like "urgent", "asap", "important"
- Priority should be 'low' for words like "sometime", "eventually", "when possible"
- Keep titles concise but descriptive
- Return ONLY valid JSON in this exact format:
{
  "title": "string",
  "description": "string or null",
  "dueDate": "YYYY-MM-DD or null",
  "priority": "low|medium|high",
  "category": "string or null"
}`
        },
        {
          role: "user",
          content: input
        }
      ],
      temperature: 0.3,
      max_tokens: 500,
    })

    const response = completion.choices[0]?.message?.content
    if (!response) {
      throw new Error('No response from OpenAI')
    }

    const parsed = JSON.parse(response)
    
    // Validate the response structure
    if (!parsed.title || !parsed.priority) {
      throw new Error('Invalid response structure')
    }

    return {
      title: parsed.title,
      description: parsed.description || undefined,
      dueDate: parsed.dueDate || undefined,
      priority: parsed.priority,
      category: parsed.category || undefined,
    }
  } catch (error) {
    console.error('Error processing task with OpenAI:', error)
    
    // Fallback: create a basic task from the input
    return {
      title: input,
      priority: 'medium' as const,
    }
  }
}

export async function generateTaskSuggestions(userId: string, recentTasks: string[]): Promise<string[]> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are an AI assistant that generates helpful task suggestions based on a user's recent task history.

Analyze the recent tasks and suggest 3-5 new tasks that would be relevant and helpful.
Consider:
- Common follow-up tasks
- Related work that might be needed
- Productivity patterns
- Time-based suggestions

Return ONLY a JSON array of strings, like: ["suggestion 1", "suggestion 2", "suggestion 3"]`
        },
        {
          role: "user",
          content: `Recent tasks: ${recentTasks.join(', ')}`
        }
      ],
      temperature: 0.7,
      max_tokens: 300,
    })

    const response = completion.choices[0]?.message?.content
    if (!response) {
      return []
    }

    const suggestions = JSON.parse(response)
    return Array.isArray(suggestions) ? suggestions : []
  } catch (error) {
    console.error('Error generating task suggestions:', error)
    return []
  }
}
