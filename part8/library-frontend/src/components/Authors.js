import React, { useState } from 'react'
import Select from 'react-select'

const Authors = (props) => {
    const [name, setName] = useState('')
    const [born, setBorn] = useState('')

    if (!props.show) {
        return null
    }

    if (props.authorQuery.loading) {
        return <div>loading...</div>
    }

    const authors = props.authorQuery.data.allAuthors

    const submit = async (e) => {
        e.preventDefault()

        await props.editAuthorMutation({
            variables: { name, setBornTo: Number(born) }
        })

        setName('')
        setBorn('')
    }

    return (
        <div>
            <h2>authors</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>
                            born
                        </th>
                        <th>
                            books
                        </th>
                    </tr>
                    {authors.map(a =>
                        <tr key={a.id}>
                            <td>{a.name}</td>
                            <td>{a.born}</td>
                            <td>{a.bookCount}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div>
                <form onSubmit={submit}>
                    <h3>Set birthyear</h3>
                    name
                    <Select
                        value={name}
                        onChange={(option) => setName(option.value)}
                        options={authors.map(a => { return { value: a.name, label: a.name } })}
                    />
                    born
                    <input
                        type='number'
                        value={born}
                        onChange={({ target }) => setBorn(target.value)}
                    />
                    <button type='submit'>update author</button>
                </form>
            </div>
        </div>
    )
}

export default Authors
