import csvParser from '../model/csvParser.js';
import fs from 'fs'

//controller to upload file
const uploadFile = async (req, res) => {
  try {
    const filePath = req.file.path;
    const data = await csvParser(filePath);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

//controller to list files
const listFiles = (req, res) => {
  const uploadDir = './uploads';

  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return res.status(500).json({ success: false, error: 'Error reading directory' });
    }

    res.json({ success: true, data: files });
  });
};

//controller to get file content
const getFileContents = async (req, res) => {
  const fileName = req.params.fileName;
  const filePath = `./uploads/${fileName}`;
  const data = await csvParser(filePath);
    res.json({ success: true, data });
};

export { uploadFile, listFiles, getFileContents };
