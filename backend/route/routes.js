import express from 'express';
import {uploadFile, listFiles, getFileContents} from '../controller/upload.controller.js';
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({
    storage: storage
})

router.post('/', upload.single('csvFile'), uploadFile);
router.get('/list', listFiles);
router.get('/:fileName', getFileContents);

export default router;
