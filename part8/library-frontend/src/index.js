import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { InMemoryCache } from 'apollo-cache-inmemory'

import App from './App'

const token = window.localStorage.getItem('token')
const headers = { authorization: token ? `Bearer ${token}` : null }

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    headers,
    cache: new InMemoryCache(),
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root')
)
