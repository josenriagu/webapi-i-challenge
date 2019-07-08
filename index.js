const express = require('express');

const db = require('./data/db.js');

const server = express();
server.use(express.json());

server.get('/api/users', (req, res) => {
   // perfomr the find() operation
   db.find()
      .then(users => {
         // respond with 200 OK and sends the users object
         res.status(200).json(users);
      })
      .catch(err => {
         res.status(500).json({
            // if error, responds with 500 and sends an error message
            error: 'The users information could not be retrieved.',
            err,
         });
      });
});

server.listen(5000, () => {
   console.log('\n*** Awesome!! Server Running on http://localhost:5000 ***\n');
});