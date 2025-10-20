import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { TaskInput } from '@/components/task-input'
import { useTaskStore } from '@/hooks/use-task-store'

// Mock the task store
jest.mock('@/hooks/use-task-store')
const mockUseTaskStore = useTaskStore as jest.MockedFunction<typeof useTaskStore>

describe('TaskInput', () => {
  const mockCreateTaskFromNaturalLanguage = jest.fn()

  beforeEach(() => {
    mockUseTaskStore.mockReturnValue({
      createTaskFromNaturalLanguage: mockCreateTaskFromNaturalLanguage,
    } as any)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders task input form', () => {
    render(<TaskInput />)
    
    expect(screen.getByPlaceholderText(/type your task in natural language/i)).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('submits task when form is submitted', async () => {
    render(<TaskInput />)
    
    const input = screen.getByPlaceholderText(/type your task in natural language/i)
    const submitButton = screen.getByRole('button')
    
    fireEvent.change(input, { target: { value: 'Test task' } })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(mockCreateTaskFromNaturalLanguage).toHaveBeenCalledWith('Test task')
    })
  })

  it('does not submit empty task', () => {
    render(<TaskInput />)
    
    const submitButton = screen.getByRole('button')
    
    fireEvent.click(submitButton)
    
    expect(mockCreateTaskFromNaturalLanguage).not.toHaveBeenCalled()
  })

  it('shows example prompts', () => {
    render(<TaskInput />)
    
    expect(screen.getByText(/try these examples/i)).toBeInTheDocument()
    expect(screen.getByText(/remind me to email ana tomorrow/i)).toBeInTheDocument()
  })

  it('fills input when example is clicked', () => {
    render(<TaskInput />)
    
    const exampleButton = screen.getByText(/remind me to email ana tomorrow/i)
    fireEvent.click(exampleButton)
    
    const input = screen.getByPlaceholderText(/type your task in natural language/i)
    expect(input).toHaveValue('Remind me to email Ana tomorrow')
  })
})
