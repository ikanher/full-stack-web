const name = 'Test User'
const username = 'testuser'
const password = 'testpassword'

describe('Blog app', function() {
    beforeEach(() => {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = { name, username, password }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000')
    })
    it('front page can be opened', function() {
        cy.contains('Blogs')
    })
    it('user can login', function() {
        cy.contains('Login')
            .click()

        cy.get('[data-testid=username]')
            .type(username)

        cy.get('[data-testid=password]')
            .type(password)

        cy.get('[data-testid=submit]')
            .click()

        cy.contains(`${name} logged in`)
    })
    it('user is listed in users page', function() {
        cy.contains('Users')
            .click()

        cy.contains(name)
    })

    describe('When logged in', function() {
        beforeEach(() => {
            cy.contains('Login')
                .click()

            cy.get('[data-testid=username]')
                .type(username)

            cy.get('[data-testid=password]')
                .type(password)

            cy.get('[data-testid=submit]')
                .click()
        })
        it('name of the user is shown', function() {
            cy.contains(`${name} logged in`)
        })
        it('a new blog can be created', function() {
            cy.contains('New blog')
                .click()

            cy.get('[data-testid=title]')
                .type('a blog created by cypress')

            cy.get('[data-testid=author]')
                .type('Cypress')

            cy.get('[data-testid=url]')
                .type('http://example.com')

            cy.get('[data-testid=submit]')
                .click()

            cy.contains('a blog created by cypress')
        })
    })
    describe('When blog exists', function() {
        beforeEach(() => {
            cy.contains('Login')
                .click()

            cy.get('[data-testid=username]')
                .type(username)

            cy.get('[data-testid=password]')
                .type(password)

            cy.get('[data-testid=submit]')
                .click()

            cy.contains('New blog')
                .click()

            cy.get('[data-testid=title]')
                .type('a blog created by cypress')

            cy.get('[data-testid=author]')
                .type('Cypress')

            cy.get('[data-testid=url]')
                .type('http://example.com')

            cy.get('[data-testid=submit]')
                .click()
        })
        it('it can be liked', function() {
            cy.contains('Blogs')
                .click()

            cy.contains('a blog created by cypress by Cypress')
                .find('a')
                .click()

            cy.get('[data-testid=likeButton]')
                .click()

            cy.contains('Has 1 likes')
        })
        it('it can be commented', function() {
            cy.contains('Blogs')
                .click()

            cy.contains('a blog created by cypress by Cypress')
                .find('a')
                .click()

            cy.get('[data-testid=comment]')
                .type('test comment by Cypress')

            cy.get('[data-testid=submitComment]')
                .click()

            cy.contains('test comment by Cypress')
        })
    })
})
