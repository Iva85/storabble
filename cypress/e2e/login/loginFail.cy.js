describe('Login fail tests', () => {

    beforeEach(() => {
        cy.visit('/en/login', )
        
    })

    it('Attempt to log in using valid email and password combinations with account that is not confirmed and verify that appropriate error messages are displayed', () => {
        cy.get('.btn-wrapper > :nth-child(1)').click()
        cy.fixture('user.json').as('user').then((user) => {
            cy.get('input[type="email"]').type(user.unconfirmedEmail)
            cy.get('input[type="password"]').type(user.unconfirmedPassword)
        });
        cy.intercept('POST', '/api/login').as('signIn')
        cy.get('button[type="submit"]').click()
        cy.wait('@signIn').its('response.statusCode').should('eq', 401)
        cy.url().should('include', '/en/login')
        cy.get('form > :nth-child(3)')
            .should('be.visible')
            .should('have.text', 'Please enter a valid email address.')
        cy.get('form > :nth-child(5)')
            .should('be.visible')
            .should('have.text', 'Your password is incorrect.')
            
    });

    it('Attempt to log in with all the empty fields and verify that appropriate error messages are displayed', () => {
        cy.get('.btn-wrapper > :nth-child(1)').click()
        cy.get('button[type="submit"]').click()
        cy.url().should('include', '/en/login')
        cy.get('form > :nth-child(3)')
            .should('be.visible')
            .should('have.text', 'This field is required.')
        cy.get('form > :nth-child(5)')
            .should('be.visible')
            .should('have.text', 'This field is required.')
            
    });

    it('The email field is left empty, ensuring the user is prompted to fill it in', () => {
        cy.get('.btn-wrapper > :nth-child(1)').click()
        cy.fixture('user.json').as('user').then((user) => {
            cy.get('input[type="password"]').type(user.password2)
        });
        cy.get('button[type="submit"]').click()
        cy.url().should('include', '/en/login')
        cy.get('form > :nth-child(3)')
            .should('be.visible')
            .should('have.text', 'This field is required.')  
    });

    it('The password field is left empty, ensuring the user is prompted to fill it in', () => {
        cy.get('.btn-wrapper > :nth-child(1)').click()
        cy.fixture('user.json').as('user').then((user) => {
            cy.get('input[type="email"]').type(user.email1)
        });
        cy.get('button[type="submit"]').click()
        cy.url().should('include', '/en/login')
        cy.get('.invalid-msg')
            .should('be.visible')
            .should('have.text', 'This field is required.')
    });

    it('Attempt to log in with an invalid email address and verify error message', () => {
        cy.get('.btn-wrapper > :nth-child(1)').click()
        cy.fixture('user.json').as('user').then((user) => {
            cy.get('input[type="email"]').type(user.invalidEmail)
            cy.get('input[type="password"]').type(user.invalidPassword)
        });
        cy.get('button[type="submit"]').click()
        cy.url().should('include', '/en/login')
        cy.get('form > :nth-child(3)')
            .should('be.visible')
            .should('have.text', 'Please enter a valid email address.')  
    });

    it('Enter a valid email but an incorrect password and verify error message', () => {
        cy.get('.btn-wrapper > :nth-child(1)').click()
        cy.fixture('user.json').as('user').then((user) => {
            cy.get('input[type="email"]').type(user.email1)
            cy.get('input[type="password"]').type(user.invalidPassword)
        });
        cy.intercept('POST', '/api/login').as('signIn')
        cy.get('button[type="submit"]').click()
        cy.wait('@signIn').its('response.statusCode').should('eq', 401)
        cy.url().should('include', '/en/login')
        cy.get('form > :nth-child(5)')
            .should('be.visible')
            .should('have.text', 'Your password is incorrect.')
    });

})