import React from 'react'

const Header = ({ course }) => {
    return (
        <>
            <h1>{course}</h1>
        </>
    )
}

const Content = ({ parts }) => {
    return (
        <>
            {parts.map(p => <Part part={p.name} exercises={p.exercises} />)}
        </>
    )
}

const Part = ({part, exercises}) => {
    return (
        <>
            <p>{part} {exercises}</p>
        </>
    )
}

const Total = ({ parts }) => {
    const total = parts.reduce((acc, p) => acc += p.exercises, 0)
    return (
        <>
            <p><b>total of {total} exercises</b></p>
        </>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

const Courses = ({ courses }) => {
    return (
        <div>
            {courses.map(c => <Course course={c} />)}
        </div>
    )
}

export default Courses
