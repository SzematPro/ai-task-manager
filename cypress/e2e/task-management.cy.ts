describe('Task Management', () => {
  beforeEach(() => {
    cy.login()
    cy.visit('/')
  })

  it('should create a new task', () => {
    const taskTitle = 'Test task from Cypress'
    
    cy.get('[data-testid="task-input"]').type(taskTitle)
    cy.get('[data-testid="submit-task"]').click()
    
    cy.get('[data-testid="task-list"]').should('contain', taskTitle)
  })

  it('should toggle task completion', () => {
    cy.createTask('Task to complete')
    
    cy.get('[data-testid="task-list"]')
      .contains('Task to complete')
      .parent()
      .find('[data-testid="toggle-task"]')
      .click()
    
    cy.get('[data-testid="task-list"]')
      .contains('Task to complete')
      .should('have.class', 'line-through')
  })

  it('should delete a task', () => {
    cy.createTask('Task to delete')
    
    cy.get('[data-testid="task-list"]')
      .contains('Task to delete')
      .parent()
      .find('[data-testid="delete-task"]')
      .click()
    
    cy.get('[data-testid="confirm-delete"]').click()
    
    cy.get('[data-testid="task-list"]').should('not.contain', 'Task to delete')
  })

  it('should filter tasks by status', () => {
    cy.createTask('Pending task')
    cy.createTask('Completed task')
    
    // Mark one task as completed
    cy.get('[data-testid="task-list"]')
      .contains('Completed task')
      .parent()
      .find('[data-testid="toggle-task"]')
      .click()
    
    // Filter by completed tasks
    cy.get('[data-testid="filter-completed"]').click()
    
    cy.get('[data-testid="task-list"]').should('contain', 'Completed task')
    cy.get('[data-testid="task-list"]').should('not.contain', 'Pending task')
  })

  it('should edit a task', () => {
    cy.createTask('Original task title')
    
    cy.get('[data-testid="task-list"]')
      .contains('Original task title')
      .parent()
      .find('[data-testid="edit-task"]')
      .click()
    
    cy.get('[data-testid="edit-input"]')
      .clear()
      .type('Updated task title')
      .blur()
    
    cy.get('[data-testid="task-list"]').should('contain', 'Updated task title')
  })
})
