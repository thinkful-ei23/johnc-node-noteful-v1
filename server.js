'use strict';



// Load array of notes
const data = require('./db/notes');
const {PORT} = require('./config')

console.log('Hello Noteful!');

// INSERT EXPRESS APP CODE HERE...
const express = require('express');
const app = express();

app.use(express.static('public'));

app.listen(PORT, function () {
    console.info(`Server listening on ${this.address().port}`);
  }).on('error', err => {
    console.error(err);
  });

app.get('/api/notes/',(req,res)=>{
    const queryObject = req.query
    let list = data
    if(queryObject.searchTerm){
        list = list.filter(item => item.title === queryObject.searchTerm)
    }
    res.json(list);
})

app.get('/api/notes/:id', (req,res)=>{
    const id = req.params.id;
    const item = data.find(item => item.id === Number(id));
    res.json(item);
})

