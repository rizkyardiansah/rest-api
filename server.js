const express = require('express')
const app = express()
const port = 6565

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.json({message: 'hello'})
})

const authRoute = require('./routes/authRoute')
app.use('/', authRoute)

const postRoute = require('./routes/postRoute')
app.use('/posts', postRoute)

app.listen(port, () => console.log(`http://localhost:${port}`))