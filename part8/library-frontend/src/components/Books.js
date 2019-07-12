import React from 'react'

const Books = (props) => {
    if (!props.show) {
        return null
    }

    if (props.bookQuery.loading) {
        return <div>loading...</div>
    }

    const books = props.bookQuery.data.allBooks

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
        </div>
    )
}

export default Books
