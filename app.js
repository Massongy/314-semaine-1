require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

const route = require('./routes/route');

app.use('/', route);

module.exports = app;


