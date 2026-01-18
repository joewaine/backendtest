const notesRouter = require('express').Router()
const Note = require('../models/note')

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
// GET one
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

// POST create

notesRouter.post("/", async (request, response, next) => {
  try {
    const { content } = request.body

    if (!content || content.trim() === "") {
      return response.status(400).json({ error: "content is required" })
    }

    const note = new Note({
      content: content.trim(),
      important: Boolean(Math.floor(Math.random() * 2))

    })

    const savedNote = await note.save()
    response.status(201).json(savedNote)
  } catch (error) {
    next(error)
  }
})


// update create
notesRouter.put('/:id', (request, response, next) => {
  console.log('getting here');
  const { content, important } = request.body
console.log('Note.findById(request.params.id)', request.params.id);
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


module.exports = notesRouter
