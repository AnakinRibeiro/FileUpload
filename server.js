const express = require('express');
const fileUpload = require('express-fileupload');
const Manual = require('./models/Manual');
const connectDB = require('./config/db');

const app = express();
connectDB();

app.get('/', (req, res) => res.send('API Running'));

app.use(fileUpload());

// Upload Endpoint
app.post('/upload', async (req, res) => {
  try {
    if (req.files === null) {
      return res.status(400).json({ msg: 'No  file uploaded' });
    }

    const file = req.files.file;

    file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }

      res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
    });

    const newManual = new Manual({
      name: file.name,
      size: file.size,
      path: `/uploads/${file.name}`
    });

    const manual = await newManual.save();

    res.send(manual);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// Listar PDFs
app.get('/upload', async (req, res) => {
  try {
    const manuais = await Manual.find().sort({ date: -1 });
    res.json(manuais);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

app.listen(5000, () => console.log('Server Started...'));
