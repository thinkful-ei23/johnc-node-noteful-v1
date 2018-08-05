'use strict';



// Load array of notes

const {CONFIG_PORT} = require('./config');
const notesRouter = require('./router/notes.router');
const morgan = require('morgan');
const port = process.env.port || CONFIG_PORT;


console.log('Hello Noteful!');

// INSERT EXPRESS APP CODE HERE...
const express = require('express');
const app = express();

app.use(morgan('dev'));

app.use(express.static('public'));

app.use(express.json());


app.use('/api',notesRouter);


app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    res.status(404).json({ message: 'Not Found' });
  });


  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });

if(require.main === module){
  app.listen(port, function () {
    console.info(`Server listening on ${this.address().port}`);
  }).on('error', err => {
    console.error(err);
  })};

  module.exports = app;