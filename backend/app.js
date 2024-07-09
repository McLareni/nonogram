import fs from 'node:fs/promises';

import bodyParser from 'body-parser';
import express from 'express';

const app = express();

app.use(express.static('images'));
app.use(bodyParser.json());

// CORS

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // allow all domains
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  next();
});

app.get('/places', async (req, res) => {
  const fileContent = await fs.readFile('./data/places.json');

  const placesData = JSON.parse(fileContent);

  res.status(200).json({ places: placesData });
});

app.get('/list-crossWord', async (req, res) => {
  const fileContent = await fs.readFile('./data/list-crossWord.json');

  const places = JSON.parse(fileContent);

  res.status(200).json({ places });
});

app.put('/list-crossWord', async (req, res) => {
  const places = req.body.places;

  await fs.writeFile('./data/list-crossWord.json', JSON.stringify(places));

  res.status(200).json({ message: 'User places updated!' });
});

app.get('/currentGrid', async (req, res) => {
  const fileContent = await fs.readFile('./data/currentGrid.json');

  const grid = JSON.parse(fileContent);

  res.status(200).json({ grid });
});

app.put('/currentGrid', async (req, res) => {

  const grid = req.body.grid;
  console.log(grid);
  await fs.writeFile('./data/currentGrid.json', JSON.stringify(grid));

  res.status(200).json({ message: 'User places updated!' });
});

// 404
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  res.status(404).json({ message: '404 - Not Found' });
});

app.listen(3000);
