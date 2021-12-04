const express =require('express')
const { getAllUsers, getUsersPurchasesById } = require('./controllers/users')
const app = express()
const PORT = 3000

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.get('/users', getAllUsers)

app.get('/users/:id/purchases', getUsersPurchasesById)

app.listen(PORT, () => {
    console.log(`Listening to Port ${PORT}`)
})