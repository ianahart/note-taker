const fs = require('fs');
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

module.exports = notes;
