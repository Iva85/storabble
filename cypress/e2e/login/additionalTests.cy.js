describe('Login fail tests', () => {

    beforeEach(() => {
        cy.visit('/en/login', )
        
    })

    it('Confirm that the "Sign up" link leads the user to the registration page', () => {
        cy.get('.btn-wrapper > :nth-child(1)').click()
        cy.fixture('user.json').as('user').then((user) => {
            cy.get('input[type="email"]').type(user.email1)
            cy.get('input[type="password"]').type(user.password1)
        });
        cy.get('.link-underline-red').click()
        cy.url().should('include', '/en/register')
    });

    it('Verify that clicking the "Forgot password?" link redirects the user to the password reset page', () => {
        cy.get('.btn-wrapper > :nth-child(1)').click()
        cy.fixture('user.json').as('user').then((user) => {
            cy.get('input[type="email"]').type(user.email2)
            cy.get('input[type="password"]').type(user.password2)
        });
        cy.get('.c-sign-in__form--reset-pass').click()
        cy.url().should('include', '/en/reset-password')
    });

})