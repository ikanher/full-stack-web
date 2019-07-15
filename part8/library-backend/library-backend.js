const {
    ApolloServer,
    gql,
    UserInputError,
    AuthenticationError,
} = require('apollo-server')

const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true);

require('dotenv').config()

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.JWT_SECRET

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })


const typeDefs = gql`
    type Author {
        id: ID!
        name: String!
        born: Int
        bookCount: Int
    }
    type Book {
        id: ID!
        title: String!
        published: Int!
        author: Author!
        genres: [String!]!
    }
    type User {
        id: ID!
        username: String!
        favoriteGenre: String!
    }
    type Token {
        value: String!
    }
    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks (author: String, genre: String): [Book]!
        allAuthors: [Author]!
        allGenres: [String]!
        me: User
    }
    type Mutation {
        addBook(
            title: String!
            author: String!
            published: Int
            genres: [String]
        ): Book
        editAuthor(
            name: String!
            setBornTo: Int!
        ): Author
        createUser(
            username: String!
            favoriteGenre: String!
        ): User
        login(
            username: String!
            password: String!
        ): Token
    }
`

const resolvers = {
    Query: {
        bookCount: () => Book.countDocuments(),
        authorCount: () => Author.countDocuments(),
        allBooks: async (root, args) => {
            let query = {}
            if (args.author) {
                const authorObj = await Author.findOne({ name: args.author })
                query.author = authorObj._id
            }
            if (args.genre) {
                query.genres = { $in: [ args.genre ] }
            }
            const books = await Book.find(query).populate('author', { name: 1, born: 1 })
            return books

        },
        allAuthors: () => Author.find(),
        allGenres: () => Book.distinct('genres'),
        me: (root, args, context) => {
            return context.currentUser
        },
    },
    Author: {
        bookCount: async (root) => {
            const author = await Author.findOne({ name: root.name })
            return await Book.countDocuments({ author: author._id })
        }
    },
    Mutation: {
        addBook: async (root, args, { currentUser }) => {
            if (!currentUser) {
                throw new AuthenticationError('not authenticated')
            }
            const { title, published, author, genres } = args

            if (!title || !author) {
                throw new UserInputError('Book title and author required.')
            }
            if (author.length < 4) {
                throw new UserInputError('Author name must be at least 4 characters long.')
            }

            let authorObj = await Author.findOne({ name: args.author })
            if (!authorObj) {
                authorObj = new Author({ name: args.author })
                await authorObj.save()
            }

            if (title.length < 2) {
                throw new UserInputError('Title must be at least 2 characters long.')
            }
            if (published && !Number.isInteger(Number(published))) {
                throw new UserInputError('Publish year must be an integer.')
            }

            const book = new Book({
                title: title,
                published: published,
                genres: genres,
                author: authorObj._id,
            })

            const savedBook = await book.save()

            await savedBook.populate('author').execPopulate()
            return savedBook
        },
        editAuthor: async (root, args, { currentUser }) => {
            if (!currentUser) {
                throw new AuthenticationError('not authenticated')
            }
            if (!args.name) {
                throw new UserInputError('Author name missing.')
            }
            if (args.name.length < 4) {
                throw new UserInputError('Author name must be at least 4 characters long.')
            }
            const author = await Author.findOne({ name: args.name })
            if (!author) {
                throw new UserInputError('Author not found.')
            }
            if (!Number.isInteger(Number(args.setBornTo))) {
                throw new UserInputError('Author birth year must be an integer.')
            }
            author.born = args.setBornTo
            return await author.save()
        },
        createUser: (root, args) => {
            if (!args.username) {
                throw new UserInputError('Username missing.')
            }
            if (!args.favoriteGenre) {
                throw new UserInputError('Favorite genre missing.')
            }
            const user = new User({ username: args.username })

            return user.save()
                .catch(error => {
                    throw new UserInputError(error.message, {
                        invalidArgs: args,
                    })
                })
        },
        login: async (root, args) => {
            if (!args.username) {
                throw new UserInputError('Username missing.')
            }
            if (!args.password) {
                throw new UserInputError('Password missing.')
            }
            const user = await User.findOne({ username: args.username })

            if (!user || args.password !== 'secred') {
                throw new UserInputError('wrong credentials')
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            }

            return { value: jwt.sign(userForToken, JWT_SECRET) }
        },
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
            const currentUser = await User.findById(decodedToken.id)
            return { currentUser }
        }
    },
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})
