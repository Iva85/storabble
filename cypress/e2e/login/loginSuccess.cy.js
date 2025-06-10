describe('Login success tests', () => {

    beforeEach(() => {
        cy.visit('/en/login', )
        
    })

    it('Validate that the placeholder text is displayed correctly', () => {
        cy.get('input[type="email"]').should('have.attr', 'placeholder', 'Enter email address')
        cy.get('input[type="password"]').should('have.attr', 'placeholder', 'Enter password')
    });

    it('Check that the login button is enabled when valid credentials are entered', () => {
        cy.get('.btn-wrapper > :nth-child(1)').click()
        cy.fixture('user.json').as('user').then((user) => {
            cy.get('input[type="email"]').type(user.email1)
            cy.get('input[type="password"]').type(user.password1)
        });
        cy.get('.btn').should('not.be.disabled')
    });

    it('Verify that the user can successfully log in with confirmed and valid email and password combinations', () => {
        cy.get('.btn-wrapper > :nth-child(1)').click()
        cy.fixture('user.json').as('user').then((user) => {
            cy.get('input[type="email"]').type(user.email2)
            cy.get('input[type="password"]').type(user.password2)
        });
        cy.intercept('POST', '/api/login').as('logIn')
        cy.get('button[type="submit"]').click()
        cy.wait('@logIn').its('response.statusCode').should('eq', 200)
        cy.url().should('include', '/en/listings')
        cy.intercept('POST', '/api/users/logout').as('logOut')
        cy.get('.c-menu__desk > .c-menu__right--user').click()
        cy.get('.show > :nth-child(4) > div').click()
        cy.wait('@logOut').its('response.statusCode').should('eq', 200)
        cy.url().should('include', '/en/login')
    });

    it('Verify that after logging in, the user is redirected to "My storage listings" page (/en/listings)', () => {
        cy.get('.btn-wrapper > :nth-child(1)').click()
        cy.fixture('user.json').as('user').then((user) => {
            cy.get('input[type="email"]').type(user.email2)
            cy.get('input[type="password"]').type(user.password2)
        });
        cy.get('button[type="submit"]').click()
        cy.url().should('include', '/en/listings')
    });

    it('Verify that the user can successfully log out after being successfully logged in', () => {
        cy.get('.btn-wrapper > :nth-child(1)').click()
        cy.fixture('user.json').as('user').then((user) => {
            cy.get('input[type="email"]').type(user.email2)
            cy.get('input[type="password"]').type(user.password2)
        });
        cy.get('button[type="submit"]').click()
        cy.intercept('POST', '/api/users/logout').as('logOut')
        cy.get('.c-menu__desk > .c-menu__right--user').click()
        cy.get('.show > :nth-child(4) > div').click()
        cy.wait('@logOut').its('response.statusCode').should('eq', 200)
        cy.url().should('include', '/en/login')
    });
  
})