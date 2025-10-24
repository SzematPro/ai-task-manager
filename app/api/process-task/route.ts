import { NextResponse } from 'next/server'
import { processMultilingualTask } from '@/lib/language-detection'
import { processWithAI } from '@/lib/ai-enhanced'
import { createProfessionalTaskTitle } from '@/lib/language-detection'

export async function POST(request: Request) {
  try {
    const { input, currentDate } = await request.json()
    
    if (!input) {
      return NextResponse.json({ error: 'Input is required' }, { status: 400 })
    }
    
    console.log('Processing task:', input)
    console.log('Current date from client:', currentDate)
    
    // Step 1: Process multilingual text (detect language and translate if needed)
    const languageResult = await processMultilingualTask(input)
    console.log('Language result:', languageResult)
    
    // Step 2: Process with AI using the translated English text and current date
    const analysis = await processWithAI(languageResult.translatedText, currentDate)
    console.log('AI Analysis:', analysis)
    
    // Step 3: Create professional title for database storage
    const professionalTitle = await createProfessionalTaskTitle(
      languageResult.originalText,
      languageResult.translatedText,
      analysis
    )
    console.log('Professional title:', professionalTitle)
    
    return NextResponse.json({
      success: true,
      originalText: languageResult.originalText,
      translatedText: languageResult.translatedText,
      professionalTitle,
      sourceLanguage: languageResult.sourceLanguage,
      wasTranslated: languageResult.wasTranslated,
      translationConfidence: languageResult.translationConfidence,
      analysis: {
        title: analysis.title,
        priority: analysis.priority,
        category: analysis.category,
        due_date: analysis.due_date,
        urgency: analysis.urgency,
        importance: analysis.importance,
        complexity: analysis.complexity,
        tags: analysis.tags,
        estimatedDuration: analysis.estimatedDuration,
        subtasks: analysis.subtasks,
        context: analysis.context,
        suggestedActions: analysis.suggestedActions,
        confidence: analysis.confidence,
        reasoning: analysis.reasoning,
        timeSensitivity: analysis.timeSensitivity,
        emotionalContext: analysis.emotionalContext,
        workContext: analysis.workContext,
        energyLevel: analysis.energyLevel,
        socialContext: analysis.socialContext,
        locationContext: analysis.locationContext,
        toolsNeeded: analysis.toolsNeeded,
        blockers: analysis.blockers,
        successCriteria: analysis.successCriteria,
      }
    })
  } catch (error) {
    console.error('Task processing error:', error)
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 })
  }
}
