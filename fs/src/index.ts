import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import serveIndex from 'serve-index'
import dotenv from 'dotenv'
import { uploadMiddleware } from './upload'
dotenv.config()

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
const port = process.env.PORT || 9050

// Send index page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// Upload Files
app.post('/upload', uploadMiddleware)

// Serve Static Files
app.use(serveIndex('public'))
app.use(express.static('public'))

// Start Server
app.listen(port, () => {
    console.log(`🚀 App listening at http://localhost:${port}`)
})