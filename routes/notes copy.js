const router = require('express').Router()

let notes = [
  { id: "1", content: "HTML is easy", important: true },
  { id: "2", content: "Browser can execute only JavaScript", important: false },
  { id: "3", content: "GET and POST are the most important methods of HTTP protocol", important: true }
]

// GET all
router.get('/', (req, res) => {
  res.json(notes)
})

// GET one
router.get('/:id', (req, res) => {
  const id = req.params.id
  const note = notes.find(n => n.id === id)

  if (!note) {
    return res.status(404).send(`<h1>${id} not found</h1>`)
  }

  return res.json(note)
})

// DELETE one
router.delete('/:id', (req, res) => {
  const id = req.params.id
  notes = notes.filter(n => n.id !== id)
  res.status(204).end()
})



//POST
// POST create
router.post('/post/', (req, res) => {
  const { content } = req.body


  const newNote = {
    id: String(Math.floor(Math.random() * 1_000_000)),
    content: content,
    important: Boolean(Math.floor(Math.random() * 2))
  }

  notes = notes.concat(newNote)
  return res.status(201).json(newNote)
})


module.exports = router
