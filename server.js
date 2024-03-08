const express = require('express');
const path = require('path');
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

app.listen(PORT, () => console.log(`sever running on port:${PORT}...`));
