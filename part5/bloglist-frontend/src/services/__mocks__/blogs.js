const blogs = [
    {
        'title': 'Test blog 1',
        'author': 'Neil Nobody',
        'url': 'http://example.com',
        'likes': 12,
        'user': {
            'username': 'hemmot',
            'name': 'Hemmo Testi',
            'id': '5d121be7e01f2f69c5f3d001'
        },
        'id': '5d12285f81f27b7bd086f9c2'
    },
    {
        'title': 'Test blog 2',
        'author': 'Neil Nobody',
        'url': 'http://example.com/2',
        'likes': 4,
        'user': {
            'username': 'hemmot',
            'name': 'Hemmo Testi',
            'id': '5d121be7e01f2f69c5f3d001'
        },
        'id': '5d122fbee585fb0783cf4809'
    },
    {
        'title': 'Google',
        'author': 'Larry Page',
        'url': 'google.com',
        'likes': 0,
        'user': {
            'username': 'hemmot',
            'name': 'Hemmo Testi',
            'id': '5d121be7e01f2f69c5f3d001'
        },
        'id': '5d13b4bfee69e654f793d239'
    },
    {
        'title': 'Cat on mat',
        'author': 'Peteris Krumins',
        'url': 'catonmat.net',
        'likes': 0,
        'user': {
            'username': 'hemmot',
            'name': 'Hemmo Testi',
            'id': '5d121be7e01f2f69c5f3d001'
        },
        'id': '5d13b65a6bcba758e04dfb8a'
    }
]

const getAll = () => {
    return Promise.resolve(blogs)
}

const setToken = (token) => {
    return
}
export default { getAll, setToken }
