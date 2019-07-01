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

        const blogs = await waitForElement(() => component.querySelectorAll('.blogEntry'))
        expect(blogs).toBe(null)
    })

    test('if user is logged in, blog list is present', async () => {
        const component = render(
            <App />
        )
        component.rerender(<App />)

        const user = {
            username: 'testuser',
            token: '1234',
            name: 'Timmy Tester'
        }

        localStorage.setItem('user', JSON.stringify(user))

        const blogs = await waitForElement(() => component.querySelectorAll('.blogEntry'))
        expect(blogs.length).toBe(4)
    })
})
