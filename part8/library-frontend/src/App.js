import React, { useState, useEffect } from 'react'
import { gql } from 'apollo-boost'
import { useQuery, useMutation } from '@apollo/react-hooks'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm.js'

const ALL_AUTHORS = gql`
{
    allAuthors {
        id
        name
        born
        bookCount
    }
}
`

const ALL_BOOKS = gql`
{
    allBooks {
        id
        title
        published
        author {
            name
            born
            bookCount
        }
    }
}
`

//const ME = gql`
//{
//    me {
//        username,
//        favoriteGenre
//    }
//}
//`

const ADD_BOOK = gql`
mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
        title: $title
        author: $author
        published: $published
        genres: $genres
    ) {
        title
        published
        genres
        author {
            name
            born
        }
    }
}
`

const EDIT_AUTHOR = gql`
mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(
        name: $name
        setBornTo: $setBornTo
    ) {
        name
        born
    }
}
`

const LOGIN = gql`
mutation login($username: String!, $password: String!) {
    login(
        username: $username
        password: $password
    ) {
        value
    }
}
`

const App = () => {
    const [page, setPage] = useState('authors')
    const [errorMessage, setErrorMessage] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useState(null)

    useEffect(() => {
        const token = window.localStorage.getItem('token')
        setToken(token)
    },[])

    const authorQuery = useQuery(ALL_AUTHORS)
    const bookQuery = useQuery(ALL_BOOKS)

    const handleError = (error) => {
        setErrorMessage(error.graphQLErrors[0].message || error)
        setTimeout(() => {
            setErrorMessage(null)
        }, 10000)
    }

    const [addBookMutation] = useMutation(ADD_BOOK, {
        onError: handleError,
        refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
    })

    const [editAuthorMutation] = useMutation(EDIT_AUTHOR, {
        onError: handleError,
        refetchQueries: [{ query: ALL_AUTHORS }],
    })

    const [loginMutation] = useMutation(LOGIN, {
        onError: handleError,
    })

    const loginHandler = async (event) => {
        event.preventDefault()
        const response = await loginMutation({
            variables: { username, password }
        })
        const token = response.data.login.value
        setToken(token)
        window.localStorage.setItem('token', token)
    }

    const usernameHandler = ({ target }) => setUsername(target.value)
    const passwordHandler = ({ target }) => setPassword(target.value)
    const logoutHandler = () => {
        window.localStorage.removeItem('token')
        setToken(null)
    }

    return (
        <div>
            {errorMessage &&
                <div style={{ color: 'red' }}>
                    {errorMessage}
                </div>
            }

            {!token ?

                <LoginForm
                    usernameHandler={usernameHandler}
                    passwordHandler={passwordHandler}
                    loginHandler={loginHandler}
                />
                :
            <>
                <div>
                    <button onClick={() => setPage('authors')}>authors</button>
                    <button onClick={() => setPage('books')}>books</button>
                    <button onClick={() => setPage('add')}>add book</button>
                    <button onClick={logoutHandler}>logout</button>
                </div>

                <Authors
                    show={page === 'authors'}
                    authorQuery={authorQuery}
                    editAuthorMutation={editAuthorMutation}
                />

                <Books
                    show={page === 'books'} bookQuery={bookQuery}
                />

                <NewBook
                    show={page === 'add'} addBookMutation={addBookMutation}
                />
            </>
            }

        </div>
    )
}

export default App
