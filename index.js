const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
//const cors = require('cors'); //  if api server is on other domain
const mongoose = require('mongoose');

const app = express();
const router = require('./router');

const mongo_uri = process.env.MONGODB_URI || 'mongodb://localhost:auth/auth';
console.log(mongo_uri);
mongoose.connect(mongo_uri);

app.use(morgan('combined'));
//app.use(cors());
// app.use(express.static('public/www'));
app.use(bodyParser.json({type: '*/*'}));

router(app);

const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('server started on port ' + port);
