import express from 'express';
import routes from './route/routes.js';
import cors from 'cors'
import path from 'path'

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the client folder
const __dirname = path.resolve()
app.use(express.static(path.join(__dirname, "..", 'frontend')));

// Routes
app.use('/upload', routes);

const PORT = 5500
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));