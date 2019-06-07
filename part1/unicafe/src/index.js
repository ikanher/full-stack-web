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

const Statistic = ({text, value}) => <tr><td>{text}</td><td>{value}</td></tr>

const Statistics = ({good, bad, neutral}) => {
    const total = good + bad + neutral
    const average = (good * 1 + neutral * 0 + bad * -1)/total
    const positivePct = (good/total) * 100

    if (total === 0) {
        return (
            <>
                <Header text={'Statistics'} />
                No feedback given.
            </>
        )
    } else {
        return (
            <>
                <Header text={'Statistics'} />
                <table>
                    <tbody>
                        <Statistic text={'good'} value={good} />
                        <Statistic text={'bad'} value={bad} />
                        <Statistic text={'neutral'} value={neutral} />
                        <Statistic text={'all'} value={total} />
                        <Statistic text={'average'} value={average} />
                        <Statistic text={'positive'} value={`${positivePct} %`} />
                    </tbody>
                </table>
            </>
        )
    }
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
