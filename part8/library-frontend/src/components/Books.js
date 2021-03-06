import React from 'react'

const Books = (props) => {
    if (!props.show) {
        return null
    }

    if (props.bookQuery.loading || props.genreQuery.loading) {
        return <div>loading...</div>
    }

    const books = props.bookQuery.data.allBooks

    const GenreButtons = () => {
        return (
            <div>
                {props.genreQuery.data.allGenres.map(
                    g => <button key={g} onClick={() => props.setGenre(g)}>{g}</button>
                )}
            </div>
        )
    }

    return (
        <div>
            <h2>books</h2>

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
            <div>
                <GenreButtons />
            </div>
        </div>
    )
}

export default Books
