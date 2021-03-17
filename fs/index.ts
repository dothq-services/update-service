import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import fs from 'fs'
import serveIndex from 'serve-index'
import multer from 'multer'

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
const port = process.env.PORT || 9050

// Send index page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// Upload File

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // This is extremely important, but MAKE SURE TO SUBMIT THE FILE LOCATION BEFORE THE ACUTAL FILE
        // Like, just make sure the file order is { fileLocation, releaseFile }
        // Otherwise the location is "undefined"
        // and it crashes the server.
        // Will fix later
        if (!fs.existsSync(path.join(__dirname, `./public/pub${req.body.fileLocation}`))) {
            fs.mkdirSync(path.join(__dirname, `./public/pub${req.body.fileLocation}/`), { recursive: true })
        } 
        cb(null, `./public/pub/${req.body.fileLocation}`)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage });
app.post('/upload', upload.single('releaseFile'), (req, res, next) => {
    const file = req.file;
    if(req.body[0] === Object) {
        return res.status(400).send({error: 'misorderedParams', message: 'The file location must be submitted before the file' })
    }
    if (!file) {
        return res.status(400).send({ error: 'noFiles', message: 'No files were uploaded to the server'})
    }

    res.send({ success: 'fileUploaded', message: 'File successfully uploaded', location: `/pub${req.body.fileLocation}/${req.file.originalname}`})
})

// Serve Static Files
app.use(serveIndex('public'))
app.use(express.static('public'))

app.listen(port, () => {
    console.log(`🚀 App listening at http://localhost:${port}`)
})