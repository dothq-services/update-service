import multer from 'multer'
import path from 'path'
import fs from 'fs'

// Upload File
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // This is extremely important, but MAKE SURE TO SUBMIT THE FILE LOCATION BEFORE THE ACUTAL FILE
        // Like, just make sure the file order is { fileLocation, releaseFile }
        // Otherwise the location is "undefined"

        try {
            // Strip slash from file location (to prevent "pubundefined"-type errors)
            let location = req.body.fileLocation
            if (req.body.fileLocation) {
                if (req.body.fileLocation.substring(0, 1) === '/') {
                    location = req.body.fileLocation.substring(1)
                } else {
                    location = req.body.fileLocation
                }
            }
            // Verify that the folder exists, and if not, create it
            if (!fs.existsSync(path.join(__dirname, `./public/pub/${location}`))) {
                fs.mkdirSync(path.join(__dirname, `./public/pub/${location}/`), { recursive: true })
            }
            // Return the file location
            cb(null, `./public/pub/${req.body.fileLocation}`)
        } catch {
            return null;
        }
        
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage }).single('releaseFile');

export default upload;