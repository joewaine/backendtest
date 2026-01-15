const router = require('express').Router()

let persons = [
  { id: "1", name: "indx Arto Hellas", number: "040-123456" },
  { id: "2", name: "indx Ada Lovelace", number: "39-44-5323523" },
  { id: "3", name: "Dan Abramov", number: "12-43-234345" },
  { id: "4", name: "indx Mary Poppendieck", number: "39-23-6423122" }
]

// GET all persons
router.get('/', (req, res) => {
  res.json(persons)
})

// INFO
router.get('/info', (req, res) => {
  const currentDateString = new Date().toString()
  res.send(`<h1>phonebook has info for ${persons.length} people</h1><br/>${currentDateString}`)
})

// GET one
router.get('/:id', (req, res) => {
  const id = req.params.id
  const person = persons.find(p => p.id === id)

  if (!person) {
    return res.status(404).send(`<h1>${id} not found</h1>`)
  }

  return res.json(person)
})

// DELETE one
router.delete('/:id', (req, res) => {
  const id = req.params.id
  persons = persons.filter(p => p.id !== id)
  res.status(204).end()
})



// POST create
router.post('/', (req, res) => {
  const { name, number } = req.body

  // basic validation
  if (!name || name.trim() === '') {
    return res.status(400).json({ error: 'name missing' })
  }
  if (!number || number.trim() === '') {
    return res.status(400).json({ error: 'number missing' })
  }

  const incomingName = name.trim().toLowerCase()
  const nameExists = persons.some(p => p.name.trim().toLowerCase() === incomingName)

  if (nameExists) {
    return res.status(409).json({ error: `name '${name}' already exists` })
  }

  const newPerson = {
    id: String(Math.floor(Math.random() * 1_000_000)),
    name: name.trim(),
    number: number.trim()
  }

  persons = persons.concat(newPerson)
  return res.status(201).json(newPerson)
})

module.exports = router
