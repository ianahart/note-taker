const express = require('express');
const path = require('path');
const api = require('./routes/api');

// initialize express app
const app = express();

// set the PORT number for the express app to listen on
const PORT = process.env.PORT || 3001;

// server static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// parse incoming requests with json payloads
app.use(express.json());

// parse form data to expose in the request body
app.use(express.urlencoded({ extended: true }));

// setup api routes
app.use('/api', api);

// send back the notes.html file when hitting GET::/notes
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});

// catch all route that will redirect any traffic to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.listen(PORT, () => console.log(`sever running on port:${PORT}...`));
