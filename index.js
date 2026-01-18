
require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const notesRouter = require('./routes/notes')
const personsRouter = require('./routes/persons')
const Note = require('./models/note')

const app = express()

app.use(cors())
app.use(express.json())


// MONGO
// MONGO
// MONGO




const mongoUrl = process.env.MONGODB_URI
console.log(mongoUrl)
mongoose
  .connect(mongoUrl, { family: 4 })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.error('error connecting to MongoDB:', error.message)
  })



// MONGO
// MONGO
// MONGO
















morgan.token('body', (req) => (req.method === 'POST' ? JSON.stringify(req.body) : ''))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// (Optional) request logger — note params will be {} here for global middleware
const requestLogger = (req, res, next) => {
  console.log('Method:', req.method)
  console.log('Path:  ', req.path)
  console.log('Body:  ', req.body)
  console.log('---')
  next()
}
app.use(requestLogger)

app.get('/', (req, res) => {
  res.send('<h1>helo world</h1>')
})

// Mount routers
app.use('/notes', notesRouter)
app.use('/persons', personsRouter)

// Unknown endpoint last
const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


const errorHandler = (error, req, res, next) => {
  console.error(error.name, error.message)

  if (error.name === 'CastError') {
    return res.status(400).json({ error: 'malformatted id' })
  }

  next(error)
}


// update create
notesRouter.put('/:id', (request, response, next) => {
  const { content, important } = request.body

  Note.findById(request.params.id)
    .then(note => {
      if (!note) {
        return response.status(404).end()
      }

      note.content = content
      note.important = important

      return note.save().then((updatedNote) => {
        response.json(updatedNote)
      })
    })
    .catch(error => next(error))
})





app.use(errorHandler)
