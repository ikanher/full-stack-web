import React from 'react'
import 'jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'

import Blog from '../components/Blog.js'

test('renders content', () => {
    const title = 'Testing blog entry'
    const author = 'Arnold Author'
    const url = 'http://example.com'
    const userId = 1

    const blog = {
        title: title,
        author: author,
        likes: 2,
        url: url,
        user: {
            userId,
        }
    }

    const user = {
        id: userId,
    }

    const component = render(
        <Blog blog={blog} user={user} />
    )

    const mainInfo = component.container.querySelector('#mainInfo')
    expect(mainInfo).toHaveTextContent(title)
    expect(mainInfo).toHaveTextContent(author)

    const additionalInfo = component.container.querySelector('#additionalInfo')
    expect(additionalInfo).toHaveStyle('display: none')
})

test('clicking on the blog reveals additional info ', async () => {
    const title = 'Testing blog entry'
    const author = 'Arnold Author'
    const url = 'http://example.com'
    const userId = 1

    const blog = {
        title: title,
        author: author,
        likes: 2,
        url: url,
        user: {
            userId,
        }
    }

    const user = {
        id: userId,
    }

    const component = render(
        <Blog blog={blog} user={user} />
    )

    const mainInfo = component.container.querySelector('#mainInfo')
    fireEvent.click(mainInfo)

    const additionalInfo = component.container.querySelector('#additionalInfo')
    expect(additionalInfo).toHaveStyle('display: block')
})
