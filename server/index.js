// index.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const {authCheck, isAdmin, isUser} = require('./passport/auth');

const app = express();
require('dotenv').config();

// routes views
const auth = require('./routes/auth');
const index = require('./routes/index');
const equipments = require('./routes/equipments');
const employees = require('./routes/employees');
const requests = require('./routes/requests');
const checks = require('./routes/checks');

// Specify location of views
app.set("views", "./server/views");
// Connect to MongoDB
mongoose
    .connect("mongodb://mongo:27017/node-app", { useNewUrlParser: true })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));
// Start up the server on port 3000
const port = 3000;
app.listen(port, () => console.log(`Server running on http://localhost:8080`));

const path = __dirname + '/views/';

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(cookieParser());

app.use(cors());

app.use(express.static(path));

app.use(parseBodyRequest);

// Views
app.use('/equipments', [authCheck], equipments);
app.use('/employees', [authCheck, isAdmin], employees);
app.use('/requests', authCheck, requests);
app.use('/checks', [authCheck, isAdmin], checks);
app.use('/auth', auth);
app.use('/', authCheck, index);


function parseBodyRequest (req, res, next) {
    let reqBody = {};
    Object.keys(req.body).forEach(key => {
        if (typeof req.body[key] === 'string' && !req.body[key]) {
            reqBody[key] = null;
            return;
        }
        reqBody[key] = req.body[key];
    })

    req.body = reqBody;

    return next();
}
