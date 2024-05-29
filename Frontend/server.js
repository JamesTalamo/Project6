//FrontEND
const path = require('path')
const cors = require('cors')

const express = require('express')
const app = express()

app.use(cors())

app.use(express.json())
app.use(express.static('public'))
app.use(express.static('routesJS'))


app.use('/auth', (req,res) => {
    res.sendFile(path.join(__dirname,'authRoutes','dashboard.html'))
})

app.use('/', (req, res) => {
    res.sendFile(path.join(__dirname,'static','index.html'))
})

const PORT = process.env.PORT || 7979
app.listen(PORT, () => console.log(`Listening to PORT ${PORT} Frontend`))