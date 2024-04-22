// Require Express
const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog');
const api = require('./routes/index.js');

const PORT = process.env.PORT || 3001;

// Create an instance of the Express application
const app = express();

// Import custom middleware, "cLog"
app.use(clog);

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);
app.use(express.static('public')); // allows public folder to be used in express


// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);
// GET Route for notes
app.get('/notes', (req, res) =>
res.sendFile(path.join(__dirname, '/public/notes.html')) 
);

// Wildcard route to direct users to a 404 page
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/404.html'))
);

// // Set up a basic route without sending a message
// app.get('/', (req, res) => {
//     // Perform some action or return a different response
//     // For example, render a template or redirect to another URL
//     res.render('index'); // Example of rendering a template
//   });

//   // Start the server

// starts the server
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);