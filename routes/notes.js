const notesRouter = require('express').Router()
const Note = require('../models/note')


let notes = [
  { id: "1", content: "HTML is easy", important: true },
  { id: "2", content: "Browser can execute only JavaScript", important: false },
  { id: "3", content: "GET and POST are the most important methods of HTTP protocol", important: true }
]

// GET all
notesRouter.get('/', async (req, res, next) => {
  try {
    const note = await Note.find({})

    if (!note) {
      return res.status(404).json({ error: 'note not found' })
    }

    res.json(note)
  } catch (error) {
    next(error) // handles invalid ObjectId
  }
})




notesRouter.get('/:id', async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id)

    if (!note) {
      return res.status(404).json({ error: 'note not found' })
    }

    res.json(note)
  } catch (error) {
    next(error) // handles invalid ObjectId
  }
})





// DELETE one
// notesRouter.delete('/:id', (req, res) => {
//   const id = req.params.id
//   notes = notes.filter(n => n.id !== id)
//   res.status(204).end()
// })


notesRouter.delete('/:id', async (req, res, next) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id)

    if (!deletedNote) {
      return res.status(404).json({ error: 'note not found' })
    }

    return res.status(204).end()
  } catch (error) {
    next(error) // handles invalid ObjectId
  }
})



//POST
// POST create
notesRouter.post('/post/', (req, res) => {
  const { content } = req.body


  const newNote = {
    id: String(Math.floor(Math.random() * 1_000_000)),
    content: content,
    important: Boolean(Math.floor(Math.random() * 2))
  }

  notes = notes.concat(newNote)
  return res.status(201).json(newNote)
})


module.exports = notesRouter
