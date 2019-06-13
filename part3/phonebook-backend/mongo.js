import mongoose from 'mongoose'

const createPerson = (name, number) => {
    const person = new Person({ name, number })
    person.save().then(response => {
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close();
    })
}

const listPersons = () => {
    Person.find({}).then(result => {
        result.forEach(p => {
            console.log(`${p.name} ${p.number}`)
        })
        mongoose.connection.close()
    })
}

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const mongoURL = `mongodb+srv://fullstack:${password}@cluster0-o8edf.mongodb.net/persons?retryWrites=true&w=majority`

mongoose.connect(mongoURL, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})
const Person = mongoose.model('Person', personSchema)

if (process.argv.length > 4) {
    const name = process.argv[3]
    const number = process.argv[4]
    console.log(`name: ${name}, number: ${number}`)
    createPerson(name, number)
} else {
    listPersons()
}

