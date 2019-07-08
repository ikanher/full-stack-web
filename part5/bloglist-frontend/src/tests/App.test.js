import React from 'react'
import { render, waitForElement } from '@testing-library/react'

jest.mock('../services/blogs')

import App from '../App.js'

describe('<App />', () => {
    test('if user is not logged in, login button is present', async () => {
        const component = render(
            <App />
        )
        component.rerender(<App />)

        const elem = await waitForElement(() => component.getByText('login'))
        expect(elem).not.toBe(null)
    })

    test('if user is not logged in, blog list is not present', async () => {
        const component = render(
            <App />
        )
        component.rerender(<App />)

        await waitForElement(() => component.getByText('Blogs'))

        const blogs = component.container.querySelectorAll('.blogEntry')

        expect(blogs.length).toBe(0)
    })

    test('if user is logged in, blog list is present', async () => {
        const user = {
            username: 'testuser',
            token: '1234',
            name: 'Timmy Tester'
        }

        localStorage.setItem('user', JSON.stringify(user))

        const component = render(
            <App />
        )
        component.rerender(<App />)

        await waitForElement(() => component.getByText('Blogs'))

        const blogs = component.container.querySelectorAll('.blogEntry')

        expect(blogs.length).toBe(4)
    })
})
