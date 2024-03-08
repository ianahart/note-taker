const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const notes = require('express').Router();
const databaseFileName = path.join(__dirname, '../db/db.json');

// read the db file and send the parsed json back to the client
notes.get('/', (req, res) => {
  fs.readFile(databaseFileName, (err, data) => {
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

      res.status(201).json(newNote);
    });
  });
});

notes.delete('/:id', (req, res) => {
  fs.readFile(databaseFileName, (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error', message: 'Unable to read read from database' });
    }
    let notes = JSON.parse(data);

    notes = notes.filter((note) => note.id !== req.params.id);

    fs.writeFile(databaseFileName, JSON.stringify(notes), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Internal Server Error', message: 'Unable to write to database' });
      }

      res.status(200).json({ message: 'success' });
    });
  });
});

module.exports = notes;
