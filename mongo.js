const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = encodeURIComponent(process.argv[2])

const url = `mongodb+srv://joewaine1987:${password}@cluster0.ziuacxu.mongodb.net/?appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const notes = [
  { id: "1", content: "HTML is easy", important: true },
  { id: "2", content: "Browser can execute only JavaScript", important: false },
  { id: "3", content: "GET and POST are the most important methods of HTTP protocol", important: true }
]

// const run = async () => {
//   await mongoose.connect(url)
//   console.log('connected to MongoDB')

//   // optional: clear existing notes first
//   // await Note.deleteMany({})

//   // IMPORTANT: remove 'id' because Mongo uses _id
//   const notesWithoutId = notes.map(({ id, ...rest }) => rest)

//   const result = await Note.insertMany(notesWithoutId)
//   console.log(`inserted ${result.length} notes`)

//   await mongoose.connection.close()
// }

// run().catch(err => {
//   console.error(err)
//   mongoose.connection.close()
// })



function toBoolean(str) {
  if (str === "true") return true;
  if (str === "false") return false;
  throw new Error("Not a boolean string");
}


const content = process.argv[3]

const important = toBoolean(process.argv[4])

const note = new Note({
  content,
  important
})

note.save().then(result => {
  console.log('note saved!')

console.log(`added "${content}", said the note; important level: ${important} to notebook`)
// Note.find({ important: true }).then(result => {
Note.find({}).then(result => {


  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})

})




