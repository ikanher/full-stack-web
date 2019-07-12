import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { HttpLink } from 'apollo-link-http'

import App from './App'

const token = window.localStorage.getItem('token')

const link = new HttpLink({
    headers: { authorization: `Bearer ${token}` }
})

const client = new ApolloClient({
    link,
    uri: 'http://localhost:4000/graphql',
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root')
)
