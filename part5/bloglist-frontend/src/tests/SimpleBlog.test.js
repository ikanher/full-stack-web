import React from 'react'
import 'jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'

import SimpleBlog from '../components/SimpleBlog.js'

test('renders content', () => {
    const title = 'Testing blog entry'
    const author = 'Arnold Author'

    const blog = {
        title: title,
        author: author,
        likes: 2,
    }

    const component = render(
        <SimpleBlog blog={blog} />
    )

    expect(component.container).toHaveTextContent(title)
    expect(component.container).toHaveTextContent(author)
    expect(component.container).toHaveTextContent('blog has 2 likes')
})

test('clicking the button twice calls event handler twice', async () => {
    const mockHandler = jest.fn()

    const title = 'Testing blog entry'
    const author = 'Arnold Author'

    const blog = {
        title: title,
        author: author,
        likes: 2,
    }

    const component = render(
        <SimpleBlog blog={blog} onClick={mockHandler} />
    )

    //const button = component.getByText('like')
    const button = component.container.querySelector('#likeButton')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)
})
