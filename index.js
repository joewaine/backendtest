const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const notesRouter = require('./routes/notes')
const personsRouter = require('./routes/persons')

const app = express()

app.use(cors())
app.use(express.json())

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
