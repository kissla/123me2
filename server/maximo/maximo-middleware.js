const express = require('express');

const MaximoService = require('./maximo-service');

const environments = {
  sandbox: new MaximoService('http://wamasd1.aepsc.com:9080'),
  dev: new MaximoService('https://wamasd2.aepsc.com')
};
const helpers = {
  getStatusCodeFromResponse: (response) => {
    let statusCode = response.status || 500;

    if (response.response && response.response.status) {
      statusCode = response.response.status;
    }

    return statusCode;
  },
  getBodyFromResponse: (response) => {
    let body = response.data || response.message;

    if (response.response && response.response.data.Error) {
      body = response.response.data;
    }

    return body;
  }
};

const router = express.Router();
const maximo = {
  login: async (request, response, next) => {
    const { environment } = request.params;
    const service = environments[environment];
    const base64EncodedCredentials = request.headers.maxauth;
    const maximoResponse = await service.login(base64EncodedCredentials);
    const status = helpers.getStatusCodeFromResponse(maximoResponse);
    const body = helpers.getBodyFromResponse(maximoResponse);
    const cookie = maximoResponse.headers ? maximoResponse.headers['set-cookie'][0] : undefined;

    response.status(status);
    // TODO: may need to code defenisvely so know have right cookie, not assuming index 0
    response.header('set-cookie', cookie);
    response.json(body);

    return next();
  },
  whoAmI: async (request, response, next) => {
    const { environment } = request.params;
    const service = environments[environment];
    const cookieAuth = request.headers.cookie;
    const maximoResponse = await service.whoAmI(cookieAuth);
    const status = helpers.getStatusCodeFromResponse(maximoResponse);
    const body = helpers.getBodyFromResponse(maximoResponse);

    response.status(status);
    response.json(body);
    return next();
  },
  tours: async (request, response, next) => {
    const { environment } = request.params;
    const service = environments[environment];
    const cookieAuth = request.headers.cookie;
    const maximoResponse = await service.tours(cookieAuth);
    const status = helpers.getStatusCodeFromResponse(maximoResponse);
    const body = helpers.getBodyFromResponse(maximoResponse);

    response.status(status);
    response.json(body);
    return next();
  },
  tourByid: async (request, response, next) => {
    const { environment, id } = request.params;
    const service = environments[environment];
    const cookieAuth = request.headers.cookie;
    const maximoResponse = await service.getTourById(cookieAuth, id);
    const status = helpers.getStatusCodeFromResponse(maximoResponse);
    const body = helpers.getBodyFromResponse(maximoResponse);

    response.status(status);
    response.json(body);
    return next();
  },
  sync: async (request, response, next) => {
    console.log('Sync');
    response.status(200);
    response.json('Sync');
    return next();
  }
};

/*
router.post('/dev/assets', async (request, response, next) => {
  const cookieAuth = request.headers.cookie;
  const maximoResponse = await maximoData.postAsset(request.body, cookieAuth);

  response.status(maximoResponse.status);
  response.json(maximoResponse.data);

  return next();
});
*/

router.post('/:environment/login', maximo.login);
router.get('/:environment/whoami', maximo.whoAmI);
router.get('/:environment/tours', maximo.tours);
router.get('/:environment/tours/:id', maximo.tourByid);
router.get('/:environment/sync', maximo.sync);

module.exports = router;
