// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

declare global {
  namespace Cypress {
    interface Chainable {
      login(): Chainable<void>
      createTask(title: string): Chainable<void>
      deleteTask(title: string): Chainable<void>
    }
  }
}

Cypress.Commands.add('login', () => {
  // Mock authentication for testing
  cy.window().then((win) => {
    win.localStorage.setItem('supabase.auth.token', JSON.stringify({
      access_token: 'mock-token',
      user: {
        id: 'test-user-id',
        email: 'test@example.com'
      }
    }))
  })
})

Cypress.Commands.add('createTask', (title: string) => {
  cy.get('[data-testid="task-input"]').type(title)
  cy.get('[data-testid="submit-task"]').click()
  cy.get('[data-testid="task-list"]').should('contain', title)
})

Cypress.Commands.add('deleteTask', (title: string) => {
  cy.get('[data-testid="task-list"]')
    .contains(title)
    .parent()
    .find('[data-testid="delete-task"]')
    .click()
  cy.get('[data-testid="confirm-delete"]').click()
})
