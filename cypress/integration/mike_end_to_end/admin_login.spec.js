describe('Admin can reach home page', ()=> {
  it('Loads', ()=> {
      cy.visit('http://localhost:3000/#/')
      cy.url().should('include','/')
  })
})
describe('Admin can click login button and navigate to admin-login', ()=> {
  it('Clicks the login button on the navbar,', ()=> {
      cy.get('.loginButton').click()
      cy.url().should('include', '/admin-login')
  })
})
describe('Admin can type in work email', ()=> {
  it('fills out email input box', ()=> {
      const email = 'b'
      cy.get('.email')
      .should('exist')
      .type(email)
  })
})
describe('Admin can type in password', ()=> {
  it('fills out password input box', ()=> {
      const password = 'b'
      cy.get('.password')
      .should('exist')
      .type(password)
  })
})
describe('Admin can click login button', ()=> {
  it('submits a login request', ()=> {
      cy.get('.landingBtn').click()
      cy.url().should('include', '/dashboard')
  })
})
describe('Admin can logout', ()=> {
  it('logs out from the app', ()=> {
      cy.get('.loginButton').click()
      cy.url().should('include', '/')
  })
})
