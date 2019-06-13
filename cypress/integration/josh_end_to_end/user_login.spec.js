
describe('User can hit splash page', ()=> {
    it('Loads', ()=> {
        cy.visit('http://localhost:3000/#/')
        cy.url().should('include','/')
    })
})
describe('User can click login button', ()=> {
    it('Clicks the login button on the navbar,', ()=> {
        cy.get('.loginButton').click()
        cy.url().should('include', '/admin-login')
    })
})
describe('User can navigate from admin-login to user-login', ()=> {
    it('handles click on applicant login link', ()=> {
        cy.get('.user-login-link').click()
        cy.url().should('include', '/user-login')
    })
})
describe('user can type in email', ()=> {
    it('fills out email input box', ()=> {
        const email = 'user'
        cy.get('.email')
        .should('exist')
        .type(email)
    })
})
describe('user can type in password', ()=> {
    it('fills out password input box', ()=> {
        const password = '1'
        cy.get('.password')
        .should('exist')
        .type(password)
    })
})
describe('user can click login button', ()=> {
    it('submits a login request', ()=> {
        cy.get('.landingBtn').click()
        cy.url().should('include', '/dashboard')
    })
})
