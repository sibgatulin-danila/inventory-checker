const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const server = express();

server.use(bodyParser.json());
server.use(cors());

const listeningPort = process.env.PORT || 3000;

const posts = require('./routes/api/posts');
const equipment = require('./routes/api/equipment');

server.use('/api/posts', posts);
server.use('/api/equipment', equipment);

if (process.env.NODE_ENV == 'production') {
    server.use(express.static(__dirname + '/public/'));

    server.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
} else {
    server.get('/', function (req, res) {
        res.send('api working');
    });
}

server.listen(listeningPort, () => console.log(`Listening port is ${listeningPort}`));