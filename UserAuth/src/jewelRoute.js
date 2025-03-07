import express from "express"
import { addjewel } from "../controllers/jewelController.js"
import multer from "multer"

const jewelRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });
jewelRouter.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    const { buffer, originalname, mimetype } = req.file;
    console.log('Received file:', originalname, mimetype);
    if (!gfs) {
        return res.status(500).json({ message: 'GridFS is not initialized' });
    }
    const writeStream = gfs.openUploadStream(originalname, {
        content_type: mimetype,
    });
    writeStream.on('finish', (file) => {
        const fileId= writeStream.id;
        console.log('File uploaded successfully:', fileId);
        res.status(200).json({
            message: 'File uploaded successfully!',
            fileId: fileId,
        });
    });
    writeStream.on('error', (err) => {
        res.status(500).json({ message: 'Error uploading file', error: err });
    });
    writeStream.end(buffer);
});



export default jewelRouter;