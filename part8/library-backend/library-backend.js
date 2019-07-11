const { ApolloServer, gql } = require('apollo-server')
const uuid = require('uuid/v1')

let authors = [
    {
        name: 'Robert Martin',
        id: 'afa51ab0-344d-11e9-a414-719c6709cf3e',
        born: 1952,
    },
    {
        name: 'Martin Fowler',
        id: 'afa5b6f0-344d-11e9-a414-719c6709cf3e',
        born: 1963
    },
    {
        name: 'Fyodor Dostoevsky',
        id: 'afa5b6f1-344d-11e9-a414-719c6709cf3e',
        born: 1821
    },
    {
        name: 'Joshua Kerievsky', // birthyear not known
        id: 'afa5b6f2-344d-11e9-a414-719c6709cf3e',
    },
    {
        name: 'Sandi Metz', // birthyear not known
        id: 'afa5b6f3-344d-11e9-a414-719c6709cf3e',
    },
]

/*
 * It would be more sensible to assosiate book and the author by saving 
 * the author id instead of the name to the book.
 * For simplicity we however save the author name.
*/

let books = [
    {
        title: 'Clean Code',
        published: 2008,
        author: 'Robert Martin',
        id: 'afa5b6f4-344d-11e9-a414-719c6709cf3e',
        genres: ['refactoring']
    },
    {
        title: 'Agile software development',
        published: 2002,
        author: 'Robert Martin',
        id: 'afa5b6f5-344d-11e9-a414-719c6709cf3e',
        genres: ['agile', 'patterns', 'design']
    },
    {
        title: 'Refactoring, edition 2',
        published: 2018,
        author: 'Martin Fowler',
        id: 'afa5de00-344d-11e9-a414-719c6709cf3e',
        genres: ['refactoring']
    },
    {
        title: 'Refactoring to patterns',
        published: 2008,
        author: 'Joshua Kerievsky',
        id: 'afa5de01-344d-11e9-a414-719c6709cf3e',
        genres: ['refactoring', 'patterns']
    },
    {
        title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
        published: 2012,
        author: 'Sandi Metz',
        id: 'afa5de02-344d-11e9-a414-719c6709cf3e',
        genres: ['refactoring', 'design']
    },
    {
        title: 'Crime and punishment',
        published: 1866,
        author: 'Fyodor Dostoevsky',
        id: 'afa5de03-344d-11e9-a414-719c6709cf3e',
        genres: ['classic', 'crime']
    },
    {
        title: 'The Demon',
        published: 1872,
        author: 'Fyodor Dostoevsky',
        id: 'afa5de04-344d-11e9-a414-719c6709cf3e',
        genres: ['classic', 'revolution']
    },
]

const typeDefs = gql`
    type Author {
        name: String!
        born: Int
        id: ID!
        bookCount: ID!
    }
    type Book {
        title: String!
        published: Int!
        author: String!
        id: ID!
        genres: [String!]!
    }
    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks (author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
    }
    type Mutation {
        addBook(
            title: String!
            author: String!
            published: Int!
            genres: [String!]!
        ): Book
        editAuthor(
            name: String!
            setBornTo: Int!
        ): Author
    }
`

const resolvers = {
    Query: {
        bookCount: () => books.length,
        authorCount: () => authors.length,
        allBooks: (root, args) => {
            let authorFilter = (b) => b.author == args.author
            let genreFilter = (b) => b.genres.includes(args.genre)

            if (args.author && args.genre) {
                return books.filter(authorFilter).filter(genreFilter)
            }

            if (args.author) {
                return books.filter(authorFilter)
            }
            if (args.genre) {
                return books.filter(genreFilter)
            }
            return books
        },
        allAuthors: () => authors,
    },
    Author: {
        bookCount: (root) => books.reduce((acc, b) => b.author === root.name ? acc+1 : acc, 0)
    },
    Mutation: {
        addBook: (root, args) => {
            if (!authors.find(a => a.name === args.author)) {
                authors = authors.concat({
                    name: args.author,
                    id: uuid(),
                })
            }

            const book = {
                title: args.title,
                published: args.published,
                author: args.author,
                genres: args.genres,
                id: uuid(),
            }

            books = books.concat(book)
            return book
        },
        editAuthor: (root, args) => {
            let author = authors.find(a => a.name === args.name)
            if (!author) {
                return null
            }
            author.born = args.setBornTo
            authors = authors.map(a => a.id === author.id ? author : a)
            return author
        },
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})
