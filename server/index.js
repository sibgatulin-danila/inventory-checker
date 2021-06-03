// index.js
const express = require("express");
const mongoose = require("mongoose");
const passport = require('passport');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
require('dotenv').config();

// routes views
// const auth = require('./routes/auth');
const index = require('./routes/index');
const equipments = require('./routes/equipments');
const employees = require('./routes/employees');
const requests = require('./routes/requests');
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

app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use(cors());

app.use(bodyParser.json());

app.use(express.static(path));

// Views
app.use('/', index);
app.use('/equipments', equipments);
app.use('/employees', employees);
app.use('/requests', requests);

// app.use('/auth', auth);
