const express = require('express')
const app = express()

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      date: "2019-05-30T17:30:31.098Z",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only Javascript",
      date: "2019-05-30T18:39:34.091Z",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      date: "2019-05-30T19:20:14.298Z",
      important: true
    }
  ]

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-0102909"
    },
    {
        id: 2,
        name: "Juan Doe",
        number: "040-0102101"
    },
    {
        id: 3,
        name: "Juana Doe",
        number: "040-0101109"
    },

]  

app.use(express.json());

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  
app.get('/api/notes', (request, response) => {
    response.json(notes)
  })

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id, typeof id)
    console.log(request.params.id, typeof request.params.id)
    
    const note = notes.find(note => note.id === id)
    if (note) {
        response.json(note)
    }       
    else {
        response.status(404).end()
    }
        
})  

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
  
    response.status(204).end()
  })

  const generateId = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => n.id))
        : 0
        return maxId + 1
    }
    
    app.post('/api/notes', (request, response) => {
        const body = request.body;
    
        if (!body.content) {
            return response.status(400).json({
                error: 'content missing'
            })
        }
        
        const note = {
            id: generateId(),
            content: body.content,
            important: body.important || false,
            date: new Date(),
        }
    
        notes = notes.concat(note);
    
        console.log(note);
    
        response.json(note)
      })
    
// Person ...
//Get All
app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

//Get One
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id, typeof id)
    console.log(request.params.id, typeof request.params.id)
    
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    }       
    else {
        response.status(404).end()
    }
        
})  


//Delete
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    person = person.filter(person => person.id !== id)

    response.status(204).end()
})


//Info
app.get('/info', (request, response) => {
    const cantidad = persons.length;

    let html = `<h2>Phonebook tiene ${cantidad} entradas ...`
    html = html + '<br>'
    html = html + '<h3>' + new Date() + '<h3>';

    response.send(html)
    
})

const generatePersonId = () => {
    const maxId = Math.floor(Math.random() * 1000)

    console.log(maxId)
    return maxId 
}

//Crear Persona    
app.post('/api/persons', (request, response) => {
    const body = request.body;

    if (!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    }
    let person = persons.find(person => person.name === body.name)
    if (person) {
        return response.status(400).json({
            error: ' name must be unique'
        })
    }
    
    person = {
        id: generatePersonId(),
        name: body.name,
        number: body.number,
    }

    persons = persons.concat(person);

    console.log(person);

    response.json(person)
})



const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)