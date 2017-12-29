const axios = require('axios');
const https = require('https');

const lean = 'lean=1';
const pageSize = 50;
// TODO: Not needed once Maximo environments have valid HTTPS certificates.
// TODO: Ignoring self signed certificates is not good.
// https://www.owasp.org/index.php/Transport_Layer_Protection_Cheat_Sheet
const axiosClient = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
});

axiosClient.interceptors.request.use((request) => {
  console.log('Starting Request', request.url);

  return request;
});

async function makeGetRequestWithCookie(url, cookie) {
  let maximoResponse;

  try {
    maximoResponse = await axiosClient({
      method: 'GET',
      url,
      headers: {
        Cookie: cookie || 'no-cookie-set'
      }
    });
  } catch (error) {
    maximoResponse = error;
  }

  return maximoResponse;
}

class MaximoService {
  constructor(maximoEndpoint) {
    const path = '/maximo/oslc';
    this.maximoObjectStructures = {
      dutyStationPlans: 'aepdutystationplans'
    };
    this.fields = {
      dutyStations: 'stationid,description,status'
    };

    this.endpoints = {
      login: `${maximoEndpoint}${path}/login?${lean}`,
      whoami: `${maximoEndpoint}${path}/whoami?${lean}`,
      tours: () => {
        const endpoint = `${maximoEndpoint}${path}/os/${this.maximoObjectStructures.dutyStationPlans}
          ?oslc.select=${this.fields.dutyStations}
          &${lean}`;
        const noWhiteSpaceEndpoint = endpoint.replace(/\s/g, '');

        return noWhiteSpaceEndpoint;
      },
      tourById: (id) => {
        const endpoint = `${maximoEndpoint}${path}/os/${this.maximoObjectStructures.dutyStationPlans}
          ?oslc.select=${this.fields.dutyStations}
          &oslc.where=stationid="${id}"
          &${lean}`;
        const noWhiteSpaceEndpoint = endpoint.replace(/\s/g, '');

        return noWhiteSpaceEndpoint;
      },
      createAsset: `${maximoEndpoint}${path}/os/mxasset?${lean}`
    };
  }

  async login(base64EncodedCredentials) {
    let maximoResponse;

    try {
      maximoResponse = await axiosClient({
        method: 'POST',
        url: this.endpoints.login,
        headers: {
          maxauth: base64EncodedCredentials
        }
      });
    } catch (error) {
      maximoResponse = error;
    }

    return maximoResponse;
  }

  async whoAmI(cookie) {
    const response = await makeGetRequestWithCookie(this.endpoints.whoami, cookie);

    return response;
  }

  async tours(cookie) {
    const response = await makeGetRequestWithCookie(this.endpoints.tours(), cookie);

    return response;
  }

  async getTourById(cookie, id) {
    const endpoint = this.endpoints.tourById(id);
    const response = await makeGetRequestWithCookie(endpoint, cookie);

    return response;
  }
}

/* async postAsset(body, cookieAuth) {
  let maximoResponse;

  try {
    maximoResponse = await axios({
      method: 'POST',
      url: this.endpoints.createAsset,
      headers: {
        Cookie: cookieAuth
      },
      data: JSON.parse(body)
    });
  } catch (error) {
    maximoResponse = error;
  }

  return maximoResponse;
} */

module.exports = MaximoService;
