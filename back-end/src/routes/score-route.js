'use strict';

const express = require('express');
const scoreRouter = express.Router();
const uuid = require('uuid/v4');

let players = [
  {name: 'Ginger', score: 10, _id:uuid()},
  {name: 'Rosie', score: 20, _id:uuid()},
  {name: 'Khal Basil', score: 30, _id:uuid()},
  {name: 'Baby Khaleesi', score: 10000, _id:uuid()},
];

scoreRouter.get('/scores', (request, response)=>{
  players = players.sort((a,b) => {
    let score1 = a.score;
    let score2 = b.score;
    if(score1 > score2) {
        return -1;
    }
    if(score2 > score1){
        return 1;
    }
    return 0;
    });
  response.status(200).json(players); 
});

scoreRouter.post('/scores', (request, response) => {
  let newPlayer = request.body;
  newPlayer._id = uuid();
  players.push(newPlayer);
  response.status(200).json(players);
});

scoreRouter.delete('/scores', (request, response) => {
  players = players.filter(player => player._id !== request.body.id);
  response.status(200).json(players); 
});

scoreRouter.get('/scores-bigger-than/:value', (request, response) => {
  players = players.filter(player => player.score > request.params.value)
  response.status(200).json(players); 
});

module.exports = scoreRouter;
