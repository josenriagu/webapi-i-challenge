const express = require('express');

const db = require('./data/db.js');

const server = express();
server.use(express.json());

// get all users
server.get('/api/users', (req, res) => {
   // perform the find() operation
   db.find()
      .then(users => {
         // respond with 200 OK and send the users object
         res.status(200).json({
            success: true,
            users
         });
      })
      .catch(err => {
         // if error, respond with 500 and send an error message
         res.status(500).json({
            error: 'The users information could not be retrieved.',
            err,
         });
      });
});

// get user by specified ID
server.get('/api/users/:id', (req, res) => {
   const id = req.params.id;
   // perform the findById() operation
   db.findById(id)
      .then(user => {
         // if user exists, respond with 200 OK and send the users object
         if (user) {
            res.status(200).json({
               success: true,
               user,
            });
         } else {
            // else return a 404 and an error message
            res.status(404).json({
               success: false,
               message: 'The user with the specified ID does not exist.',
            });
         }
      })
      .catch(err => {
         res.status(500).json({
            // if error, responds with 500 and send an error message
            error: 'The users information could not be retrieved.',
            err,
         });
      });
});

server.listen(5000, () => {
   console.log('\n*** Awesome!! Server Running on http://localhost:5000 ***\n');
});