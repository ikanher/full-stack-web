import _ from 'lodash'

const totalLikes = (blogs) => {
    return blogs.reduce((acc, blog) => acc + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    const favorite = blogs.reduce((acc, blog) => blog.likes > acc.likes ? blog : acc, blogs[0])

    return {
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes,
    }
}

const mostBlogs = (blogs) => {
    const grouped = _.groupBy(blogs, blog => blog.author)

    let mostAuthor = blogs[0].author
    let mostBlogs = 1
    for (const [author, blogs] of Object.entries(grouped)) {
        if (blogs.length > mostBlogs) {
            mostAuthor = author
            mostBlogs = blogs.length
        }
    }

    return {
        author: mostAuthor,
        blogs: mostBlogs
    }
}

const mostLikes = (blogs) => {
    const grouped = _.groupBy(blogs, blog => blog.author)

    let mostLikedAuthor = blogs[0].author
    let mostLikes = blogs[0].likes
    for (const [author, blogs] of Object.entries(grouped)) {
        const likes = totalLikes(blogs)
        if (totalLikes(blogs) > mostLikes) {
            mostLikedAuthor = author
            mostLikes = likes
        }
    }

    return {
        author: mostLikedAuthor,
        likes: mostLikes
    }
}

export default { totalLikes, favoriteBlog, mostBlogs, mostLikes }
