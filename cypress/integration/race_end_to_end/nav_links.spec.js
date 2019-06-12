describe('land on homepage', ()=> {
    it('Loads', ()=> {
        cy.visit('http://localhost:3000/#/')
    })
})

describe('click about link', () => { 
    it('loads about page', ()=>{ 
        cy.get('.about').click()
        cy.url().should('include', '/about')
    })
})

describe('nav to home about', () => { 
    it('takes you to home page', () => { 
        cy.get('#navHomeTest').click()
        cy.url().should('include', '/')
    })
})

describe('nav to register page', () => { 
    it('takes you to register', () => { 
        cy.get('.profileBtn').click()
        cy.url().should('include', '/register')
    })
})

describe('nav to login', () => { 
    it('takes you to login', () => { 
        cy.get('#navLoginTest').click()
        cy.url().should('include', '/admin-login')
    })
})



