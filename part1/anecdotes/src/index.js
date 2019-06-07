import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({text}) => <h1>{text}</h1>

const Button = ({text, handleClick}) => {
    return (
        <button onClick={handleClick}>{text}</button>
    )
}

const AnecdoteVoter = ({anecdotes, votes, selected, voteHandler, randomHandler}) => {
    return (
        <>
            <Header text={'Anecdote of the day'} />
            {anecdotes[selected]}
            <br />
            has {votes[selected]} votes
            <br />
            <Button text={'Vote'} handleClick={() => voteHandler(selected)} />
            <Button text={'Next anecdote'} handleClick={randomHandler} />
        </>
    )
}

const AnecdoteOfTheDay = ({anecdote}) => {
    return (
        <>
            <Header text={'Anecdote with most votes'} />
            {anecdote}
        </>
    )
}

const App = ({anecdotes}) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
    const [mostVoted, setMostVoted] = useState(0)

    const randomHandler = () => {
        const randomIdx = Math.floor(Math.random()*anecdotes.length)
        setSelected(randomIdx)
    }

    const voteHandler = (idx) => {
        let votesCopy = [...votes]
        votesCopy[idx] += 1
        setVotes(votesCopy)

        const mostVotedIdx = votesCopy.indexOf(Math.max(...votesCopy))
        setMostVoted(mostVotedIdx)
    }

    return (
        <div>
            <AnecdoteVoter
                anecdotes={anecdotes}
                votes={votes}
                selected={selected}
                voteHandler={voteHandler}
                randomHandler={randomHandler}
            />
            <AnecdoteOfTheDay anecdote={anecdotes[mostVoted]} />
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
