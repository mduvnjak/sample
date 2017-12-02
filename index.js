const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
//const cors = require('cors'); //  if api server is on other domain
const mongoose = require('mongoose');

const app = express();
const router = require('./router');

mongoose.connect('mongodb://localhost:auth/auth');

app.use(morgan('combined'));
//app.use(cors());
app.use(bodyParser.json({type: '*/*'}));
router(app);

const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('server started on port ' + port);
