import listHelper from '../utils/list_helper.js'
import helper from './test_helper.js'

describe('list helper functionalities', () => {

    describe('total likes', () => {
        test('when list has only one blog equals the likes of that', () => {
            const result = listHelper.totalLikes([ helper.initialBlogs[0] ])
            expect(result).toBe(7)
        })
        test('when list has many blog equals the likes of those', () => {
            const result = listHelper.totalLikes(helper.initialBlogs)
            expect(result).toBe(36)
        })
        test('when list is empty equals the likes of zero', () => {
            const result = listHelper.totalLikes([])
            expect(result).toBe(0)
        })
    })

    describe('favorite blog', () => {
        const favorite = {
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            likes: 12,
        }

        test('when list has many blogs equals the most liked blog', () => {
            const result = listHelper.favoriteBlog(helper.initialBlogs)
            expect(result).toEqual(favorite)
        })
    })

    describe('most blogs', () => {
        const most = {
            author: 'Robert C. Martin',
            blogs: 3
        }

        test('author with the most blogs', () => {
            const result = listHelper.mostBlogs(helper.initialBlogs)
            expect(result).toEqual(most)
        })
    })

    describe('most likes', () => {
        const most = {
            author: 'Edsger W. Dijkstra',
            likes: 17
        }

        test('author with the most likes', () => {
            const result = listHelper.mostLikes(helper.initialBlogs)
            expect(result).toEqual(most)
        })
    })
})
