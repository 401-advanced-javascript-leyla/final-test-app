  
'use strict';

const express = require('express');
const cors = require('cors');

// Prepare the express app
const app = express();

const scoreRouter = require('./routes/score-route');

// App Level MW
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Routes
app.use(scoreRouter);

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server Up on ${port}`);
    });
  },
};