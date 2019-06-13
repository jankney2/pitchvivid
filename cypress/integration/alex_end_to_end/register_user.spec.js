describe('land on register form', ()=>{
  it('Loads',()=>{
    cy.visit('http://localhost:3000/#/register')
  })
})

describe('user can type in the admin key box',()=>{
  it('fills admin key box',()=>{
    const key = 'key'
    cy.get('#company-name-input')
    .should(exist)
    .type(key)
  })

})
describe('user can type in email box',()=>{
  it('fills email box',()=>{
    const email = 'admin'
    cy.get('#email-box')
    .should(exist)
    .type(email)
  })

})
describe('user can type in first name box',()=>{
  it('fills first name box',()=>{
    const name = 'first name'
    cy.get('#first-name-box')
    .should(exist)
    .type(name)
  })
})
  describe('user can type in last name box',()=>{
    it('fills last name box',()=>{
      const name = 'last name'
      cy.get('#last-name-box')
      .should(exist)
      .type(name)
    })
})