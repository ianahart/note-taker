const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const notes = require('express').Router();

// read the db file and send the parsed json back to the client
notes.get('/', (req, res) => {
  fs.readFile(path.join(__dirname, '../db/db.json'), (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error', message: 'Unable to read read from database' });
    }
    res.status(200).json(JSON.parse(data));
  });
});

// create a new note and add it to existing notes from the db file
notes.post('/', (req, res) => {
  const { title, text } = req.body;
  const newNote = { id: uuidv4(), title, text };
  const databaseFileName = path.join(__dirname, '../db/db.json');

  fs.readFile(databaseFileName, (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error', message: 'Unable to read read from database' });
    }
    let notes = JSON.parse(data);

    notes = [...notes, newNote];

    fs.writeFile(databaseFileName, JSON.stringify(notes), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Internal Server Error', message: 'Unable to write to database' });
      }

      res.json(newNote);
    });
  });
});

module.exports = notes;
