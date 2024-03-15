const connectToMongo = require('./db')
const express = require('express')
const cors = require('cors')

const app = express()
const port = 5000

connectToMongo();

app.use(cors())
app.use(express.json())

// Available Routes
app.get('/', (req, res) => {
    res.send('This is Rahul')
})

app.use('/api/auth', require('./routes/auth'));
app.use('/api/scrap', require('./routes/scrap'));

app.listen(port, () => {
  console.log(`EWRC listening on port http://localhost:${port}`)
})
