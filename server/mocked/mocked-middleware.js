const express = require('express');
const cookie = require('cookie');

const login = require('./data/login');
const users = require('./data/users');
const userPasswords = require('./data/user-passwords');
const tours = require('./data/tours');
const meters = require('./data/meters');

const router = express.Router();

const source = {
  // if pass http status code into username field to simulate an HTTP status code field for mocks.
  // Base64 handling: http://stackabuse.com/encoding-and-decoding-base64-strings-in-node-js/
  login: async (request, response, next) => {
    const base64Auth = request.headers.maxauth;
    const buffer = Buffer.from(base64Auth, 'base64');
    const credentials = buffer.toString('ascii').split(':');
    const username = credentials[0] || 'no-username-set';
    const password = credentials[1] || 'no-password-set';
    const userFound = users.filter(user => user.loginUserName.toLocaleLowerCase() === username.toLocaleLowerCase())[0] || {};
    const usernameFound = userFound.loginUserName ? userFound.loginUserName.toLocaleLowerCase() : 'no-user-found';
    const userPasswordFound = userPasswords.filter(user => user.username.toLocaleLowerCase() === usernameFound)[0] || {};
    const maximoError = {
      Error: {
        statusCode: '401',
        message: 'You cannot log in at this time. Contact the system administrator.'
      }
    };

    if (password !== userPasswordFound.password) {
      response.status(maximoError.Error.statusCode);
      response.send(maximoError);
    } else if (password === userPasswordFound.password) {
      response.header('set-cookie', `username=${usernameFound}; Path=/`);
      response.send(login);
    } else {
      response.status(500);
      response.send('Internal Server Error');
    }

    return next();
  },
  whoami: async (request, response, next) => {
    const username = cookie.parse(request.headers.cookie).username || 'no-user-in-payload';
    const user = users.filter(item => item.userName === username)[0];

    response.send(user);
    return next();
  },
  tours: async (request, response, next) => {
    const updatedTours = tours.getUpdatedTours();

    response.send(updatedTours);

    return next();
  },
  tourById: async (request, response, next) => {
    const updatedTours = tours.getUpdatedTours();
    const tourId = request.params.id;
    const tour = updatedTours.member.filter(currentTour => currentTour.stationid === tourId)[0] || {};

    response.send(tour);

    return next();
  },
  meters: async (request, response, next) => {
    response.send(meters);

    return next();
  },
  sync: async (request, response, next) => {
    console.log('Sync recieved.');
    response.send(meters);

    return next();
  }
};

router.get('/status-code', () => {}); // TODO: impelment
router.post('/login', source.login);
router.get('/whoami', source.whoami);
router.get('/sync', source.sync);
router.get('/meters', source.meters);
router.get('/tours', source.tours);
router.get('/tours/:id', source.tourById);

module.exports = router;
