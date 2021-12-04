const express =require('express')
const { getAllUsers } = require('./controllers/users')
const app = express()
const PORT = 3000

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.get('/users', getAllUsers)

app.listen(PORT, () => {
    console.log(`Listening to Port ${PORT}`)
})