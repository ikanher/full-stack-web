import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({text}) => <h1>{text}</h1>

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const Feedback = ({goodHandler, badHandler, neutralHandler}) => {

    return (
        <>
            <Header text={'Give feedback'} />
            <Button handleClick={goodHandler} text='good' />
            <Button handleClick={badHandler} text='bad' />
            <Button handleClick={neutralHandler} text='neutral' />
        </>
    )
}

const Statistics = ({good, bad, neutral}) => {
    const total = good + bad + neutral
    const average = (good * 1 + neutral * 0 + bad * -1)/total
    const positive = good/total
    return (
        <>
            <Header text={'Statistics'} />
            <p>good: {good}</p>
            <p>bad: {bad}</p>
            <p>neutral: {neutral}</p>
            <p>all: {total}</p>
            <p>average: {average}</p>
            <p>positive: {positive} %</p>
        </>
    )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Feedback
        goodHandler={() => setGood(good+1)}
        badHandler={() => setBad(bad+1)}
        neutralHandler={() => setNeutral(neutral+1)}
      />
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
