const express = require('express');
const morgan = require('morgan');

const mockedDataSource = require('./server/mocked/mocked-middleware');
const maximoDataSource = require('./server/maximo/maximo-middleware');

const server = express();

// simulate latency from remote server
const simulatedLatencyDelayInMilliseconds = 0;
server.use((req, res, next) => {
  setTimeout(() => next(), simulatedLatencyDelayInMilliseconds);
});

server.use(morgan('tiny'));

server.use('/mocked', mockedDataSource);
server.use('/maximo', maximoDataSource);

const port = 8080;
server.listen(port, () => {
  console.log('Listening on port: ', port);
});
