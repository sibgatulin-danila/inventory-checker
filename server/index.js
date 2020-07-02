const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const server = express();

server.use(bodyParser.json());
server.use(cors());

const listeningPort = process.env.PORT || 3000;

const posts = require('./routes/api/posts');

server.use('/api/posts', posts);

// server.get('/', function (req, res) {
//     res.send('hello from docker');
// });

// if (process.env.NODE_ENV === 'production') {
server.use(express.static(__dirname + '/public/'));

server.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
// }

server.listen(listeningPort, () => console.log(`Listening port is ${listeningPort}`));