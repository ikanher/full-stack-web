import React from 'react'

const Recommend = (props) => {
    if (!props.show) {
        return null
    }

    if (props.bookQuery.loading || props.meQuery.loading) {
        return <div>loading...</div>
    }

    const genre = props.meQuery.data.me.favoriteGenre
    props.setGenre(genre)

    const books = props.bookQuery.data.allBooks

    return (
        <div>
            <h2>Recommendations</h2>

            <p>Books in your favorite genre <b>{genre}</b></p>

            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>
                            author
                        </th>
                        <th>
                            published
                        </th>
                    </tr>
                    {books.map(b =>
                        <tr key={b.id}>
                            <td>{b.title}</td>
                            <td>{b.author.name}</td>
                            <td>{b.published}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Recommend
