// AI Enhanced Processing
export interface AIAnalysis {
  title: string
  priority: 'low' | 'medium' | 'high'
  category: string
  due_date: string | null
  urgency: number
  importance: number
  complexity: 'simple' | 'moderate' | 'complex'
  tags: string[]
  estimatedDuration: string | null
  subtasks: string[]
  context: string | null
  suggestedActions: string[]
  confidence: number
  reasoning: string[]
  timeSensitivity: 'flexible' | 'soon' | 'urgent'
  emotionalContext: string | null
  workContext: 'personal' | 'professional'
  energyLevel: 'low' | 'medium' | 'high'
  socialContext: 'solo' | 'collaborative' | 'team'
  locationContext: string | null
  toolsNeeded: string[]
  blockers: string[]
  successCriteria: string[]
}

export async function processWithAI(input: string, currentDate?: string): Promise<AIAnalysis> {
  try {
    // Use OpenAI for comprehensive AI analysis
    try {
      const { OpenAI } = await import('openai')
      
      if (process.env.OPENAI_API_KEY) {
        const openai = new OpenAI({
          apiKey: process.env.OPENAI_API_KEY,
        })
        
        // Get current date for context
        const today = currentDate || new Date().toISOString().split('T')[0]
        const currentYear = new Date().getFullYear()
        const currentMonth = new Date().getMonth() + 1
        const currentDay = new Date().getDate()
        
        const response = await openai.chat.completions.create({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: `You are an expert task analysis AI with advanced natural language understanding. Analyze the given task and provide a comprehensive analysis in the following JSON format.

IMPORTANT DATE CONTEXT:
- Today's date: ${today} (${currentYear}-${currentMonth.toString().padStart(2, '0')}-${currentDay.toString().padStart(2, '0')})
- Current year: ${currentYear}
- Current month: ${currentMonth}
- Current day: ${currentDay}

CRITICAL: All due dates must be in the future relative to today (${today}). Never use dates from previous years like 2022. Always calculate dates forward from the current date.

{
  "title": "string (the task title)",
  "priority": "low|medium|high",
  "category": "string (e.g., Work & Meetings, Health & Wellness, Family & Relationships, Learning & Development, Shopping & Errands, Finance & Money, Home & Maintenance, Entertainment & Leisure, Technology, etc.)",
  "due_date": "YYYY-MM-DD or null",
  "urgency": "number 1-10",
  "importance": "number 1-10", 
  "complexity": "simple|moderate|complex",
  "tags": ["array", "of", "relevant", "tags"],
  "estimatedDuration": "string or null (e.g., '30 minutes', '1-2 hours', '2-4 hours')",
  "subtasks": ["array", "of", "specific", "subtasks"],
  "context": "string (brief context description)",
  "suggestedActions": ["array", "of", "actionable", "steps"],
  "confidence": "number 1-100",
  "reasoning": ["array", "of", "reasoning", "points"],
  "timeSensitivity": "flexible|soon|urgent",
  "emotionalContext": "string or null (emotional aspects)",
  "workContext": "personal|professional",
  "energyLevel": "low|medium|high",
  "socialContext": "solo|collaborative|team",
  "locationContext": "string or null (where task should be done)",
  "toolsNeeded": ["array", "of", "required", "tools"],
  "blockers": ["array", "of", "potential", "obstacles"],
  "successCriteria": ["array", "of", "success", "metrics"]
}

ANALYSIS GUIDELINES:
- Analyze the task intelligently based on its content and context, not just keywords
- Consider the user's emotional state and context (stressed, excited, worried, etc.) for analysis but focus on the core task
- Provide realistic due dates based on urgency and task type using the current date as reference
- Generate 5-10 specific, actionable suggested actions
- Identify 3-5 potential blockers
- Define 3-5 clear success criteria
- Consider emotional, social, and contextual aspects
- Be specific and practical in all recommendations

DATE CALCULATION RULES (using current date: ${today}):
- For urgent tasks: set due dates 1-2 days from today
- For regular tasks: set due dates 3-7 days from today  
- For low priority tasks: set due dates 1-2 weeks from today
- For tasks with specific time references:
  * "tomorrow" = next day from today
  * "next week" = 7 days from today
  * "this weekend" = next Saturday/Sunday
  * "end of week" = next Friday
  * "this month" = any date within the current month (${currentYear}-${currentMonth})
  * "next month" = 30 days from today
- Always calculate dates relative to the current date provided above
- Use YYYY-MM-DD format for all dates
- If no specific time reference, use priority-based calculation

CRITICAL DATE CALCULATION EXAMPLES:
- Current date: ${today} (${currentYear}-${currentMonth}-${currentDay})
- "this month" = dates between ${currentYear}-${currentMonth}-${currentDay} and ${currentYear}-${currentMonth}-31
- "next month" = dates in ${currentYear}-${(currentMonth + 1) > 12 ? 1 : currentMonth + 1}
- "end of month" = last day of current month
- "this week" = dates within the current week
- "next week" = dates in the following week

- Handle complex tasks with multiple components intelligently
- Consider dependencies and relationships between tasks
- Analyze time sensitivity based on context and urgency indicators
- Detect work vs personal context accurately
- Assess energy requirements for the task
- Identify social aspects (solo work vs collaboration)
- Consider location requirements
- Identify necessary tools and resources
- Anticipate potential obstacles
- Define clear success metrics

IMPORTANT: This analysis should be completely AI-driven. Do not rely on static patterns or keyword matching. Use your understanding of natural language, context, and task management principles to provide intelligent analysis.`
            },
            {
              role: 'user',
              content: `Analyze this task: "${input}"`
            }
          ],
          max_tokens: 3000,
          temperature: 0.2,
        })
        
        const aiResponse = response.choices[0]?.message?.content?.trim()
        
        if (aiResponse) {
          try {
            // Parse the JSON response
            const analysis = JSON.parse(aiResponse)
            
            // Validate and fix date if necessary
            if (analysis.due_date) {
              const dueDate = new Date(analysis.due_date)
              const todayDate = new Date(today)
              const dueYear = dueDate.getFullYear()
              const dueMonth = dueDate.getMonth() + 1
              const currentMonth = new Date(today).getMonth() + 1
              
              // Check for various date issues
              const isPastDate = dueDate < todayDate
              const isWrongYear = dueYear < currentYear
              const isWrongMonth = dueYear === currentYear && dueMonth < currentMonth
              const isTooFarFuture = dueYear > currentYear + 1
              
              if (isPastDate || isWrongYear || isWrongMonth || isTooFarFuture) {
                console.log(`Fixing invalid date: ${analysis.due_date} -> calculating new date`)
                console.log(`Issues: past=${isPastDate}, wrongYear=${isWrongYear}, wrongMonth=${isWrongMonth}, tooFar=${isTooFarFuture}`)
                
                // Calculate a new date based on priority and context
                let daysToAdd = 7 // default for medium priority
                if (analysis.priority === 'high') {
                  daysToAdd = 2
                } else if (analysis.priority === 'low') {
                  daysToAdd = 14
                }
                
                // For "this month" tasks, try to keep within current month
                const endOfMonth = new Date(currentYear, currentMonth, 0).getDate()
                const daysLeftInMonth = endOfMonth - new Date(today).getDate()
                
                if (daysLeftInMonth >= daysToAdd) {
                  // Can fit within current month
                  const newDate = new Date(todayDate)
                  newDate.setDate(newDate.getDate() + daysToAdd)
                  analysis.due_date = newDate.toISOString().split('T')[0]
                } else {
                  // Move to next month
                  const newDate = new Date(todayDate)
                  newDate.setMonth(newDate.getMonth() + 1)
                  newDate.setDate(1) // First day of next month
                  analysis.due_date = newDate.toISOString().split('T')[0]
                }
                
                console.log(`Fixed date to: ${analysis.due_date}`)
              }
            }
            
            // Validate and return the analysis
            return {
              title: analysis.title || input,
              priority: analysis.priority || 'medium',
              category: analysis.category || 'General',
              due_date: analysis.due_date || null,
              urgency: analysis.urgency || 5,
              importance: analysis.importance || 5,
              complexity: analysis.complexity || 'moderate',
              tags: analysis.tags || [],
              estimatedDuration: analysis.estimatedDuration || null,
              subtasks: analysis.subtasks || [],
              context: analysis.context || null,
              suggestedActions: analysis.suggestedActions || [],
              confidence: analysis.confidence || 80,
              reasoning: analysis.reasoning || [],
              timeSensitivity: analysis.timeSensitivity || 'flexible',
              emotionalContext: analysis.emotionalContext || null,
              workContext: analysis.workContext || 'personal',
              energyLevel: analysis.energyLevel || 'medium',
              socialContext: analysis.socialContext || 'solo',
              locationContext: analysis.locationContext || null,
              toolsNeeded: analysis.toolsNeeded || [],
              blockers: analysis.blockers || [],
              successCriteria: analysis.successCriteria || [],
            }
          } catch (parseError) {
            console.warn('Failed to parse AI response, using fallback analysis:', parseError)
          }
        }
      }
    } catch (openaiError) {
      console.warn('OpenAI analysis failed, using fallback analysis:', openaiError)
    }
    
    // Simple fallback analysis if OpenAI is not available
    const today = new Date()
    const dueDate = new Date(today.getTime() + (3 * 24 * 60 * 60 * 1000))
    
    return {
      title: input,
      priority: 'medium',
      category: 'General',
      due_date: dueDate.toISOString().split('T')[0],
      urgency: 5,
      importance: 5,
      complexity: 'moderate',
      tags: [],
      estimatedDuration: null,
      subtasks: [],
      context: 'Basic task analysis - AI analysis unavailable',
      suggestedActions: [
        'Review the task requirements',
        'Plan your approach',
        'Set a timeline for completion',
        'Track your progress'
      ],
      confidence: 30,
      reasoning: ['Fallback analysis used - AI analysis unavailable'],
      timeSensitivity: 'flexible',
      emotionalContext: null,
      workContext: 'personal',
      energyLevel: 'medium',
      socialContext: 'solo',
      locationContext: null,
      toolsNeeded: [],
      blockers: ['AI analysis unavailable'],
      successCriteria: ['Task completed successfully'],
    }
  } catch (error) {
    console.error('AI processing error:', error)
    // Return default analysis on error
    return {
      title: input,
      priority: 'medium',
      category: 'General',
      due_date: null,
      urgency: 5,
      importance: 5,
      complexity: 'moderate',
      tags: [],
      estimatedDuration: null,
      subtasks: [],
      context: null,
      suggestedActions: [],
      confidence: 50,
      reasoning: [],
      timeSensitivity: 'flexible',
      emotionalContext: null,
      workContext: 'personal',
      energyLevel: 'medium',
      socialContext: 'solo',
      locationContext: null,
      toolsNeeded: [],
      blockers: [],
      successCriteria: [],
    }
  }
}