import * as Networking from './base';

export default {

  getAccessToken: (username, password) => {
    const data = { username, password };
    return Networking.requestWithJson('POST', '/auth/token', data, false);
  },

  refreshAccessToken: (refreshToken) => {
    const data = { refresh_token: refreshToken };
    return Networking.requestWithJson('POST', '/auth/refresh-token', data, false);
  },
};
