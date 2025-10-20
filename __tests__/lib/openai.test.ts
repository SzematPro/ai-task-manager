import { processNaturalLanguageTask, generateTaskSuggestions } from '@/lib/openai'

// Mock OpenAI
jest.mock('openai', () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => ({
      chat: {
        completions: {
          create: jest.fn()
        }
      }
    }))
  }
})

describe('OpenAI Integration', () => {
  describe('processNaturalLanguageTask', () => {
    it('should process a simple task', async () => {
      const mockResponse = {
        choices: [{
          message: {
            content: JSON.stringify({
              title: 'Email Ana',
              description: null,
              dueDate: '2024-01-15',
              priority: 'medium',
              category: null
            })
          }
        }]
      }

      const { default: OpenAI } = require('openai')
      const mockOpenAI = new OpenAI()
      mockOpenAI.chat.completions.create.mockResolvedValue(mockResponse)

      const result = await processNaturalLanguageTask('remind me to email ana tomorrow')
      
      expect(result).toEqual({
        title: 'Email Ana',
        description: undefined,
        dueDate: '2024-01-15',
        priority: 'medium',
        category: undefined
      })
    })

    it('should handle errors gracefully', async () => {
      const { default: OpenAI } = require('openai')
      const mockOpenAI = new OpenAI()
      mockOpenAI.chat.completions.create.mockRejectedValue(new Error('API Error'))

      const result = await processNaturalLanguageTask('test task')
      
      expect(result).toEqual({
        title: 'test task',
        priority: 'medium'
      })
    })
  })

  describe('generateTaskSuggestions', () => {
    it('should generate task suggestions', async () => {
      const mockResponse = {
        choices: [{
          message: {
            content: JSON.stringify([
              'Follow up on the email',
              'Prepare for the meeting',
              'Review the documents'
            ])
          }
        }]
      }

      const { default: OpenAI } = require('openai')
      const mockOpenAI = new OpenAI()
      mockOpenAI.chat.completions.create.mockResolvedValue(mockResponse)

      const suggestions = await generateTaskSuggestions('user-id', ['Email Ana', 'Meeting prep'])
      
      expect(suggestions).toEqual([
        'Follow up on the email',
        'Prepare for the meeting',
        'Review the documents'
      ])
    })

    it('should return empty array on error', async () => {
      const { default: OpenAI } = require('openai')
      const mockOpenAI = new OpenAI()
      mockOpenAI.chat.completions.create.mockRejectedValue(new Error('API Error'))

      const suggestions = await generateTaskSuggestions('user-id', [])
      
      expect(suggestions).toEqual([])
    })
  })
})
