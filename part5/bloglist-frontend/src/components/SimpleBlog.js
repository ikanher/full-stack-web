import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
    <div>
        <div className='blogInfo'>
            {blog.title} {blog.author}
        </div>
        <div>
            blog has {blog.likes} likes
            <button onClick={onClick} id='likeButton'>like</button>
        </div>
    </div>
)

export default SimpleBlog
