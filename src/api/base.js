/* eslint-disable no-unused-vars */

import AuthAPI from './AuthAPI';

const ENDPOINT = 'https://api.heektime.heek.kr';
const BASE_URL = `${ENDPOINT}/apis/v2`;

export const errorCodes = {
  TOKEN_EXPIRED: 'AT003',
  INVALID_USER_CREDENTIALS: 'AL001',
  INVALID_REFRESH_CREDENTIALS: 'AL002',
};


// TODO: move
// Token management
export function getAccessToken() {
  return window.localStorage.getItem('access_token');
}

export function setAccessToken(token) {
  window.localStorage.setItem('access_token', token);
}

export function getRefreshToken() {
  return window.localStorage.getItem('refresh_token');
}

export function setRefreshToken(token) {
  window.localStorage.setItem('refresh_token', token);
}


// Response handling
function toJsonOrNull(response) {
  if (response.headers.get('content-type') !== 'application/json') return Promise.resolve(null);

  return response.text()
    .then(text => (text ? JSON.parse(text) : null));
}

function checkStatus(response) {
  if (!response.ok) {
    const error = new Error(response.statusText);
    error.response = response;

    return toJsonOrNull(response)
      .then((data) => {
        error.data = data;
        if (error.data) {
          if (data.message) {
            error.message = data.message;
          }
          if (data.code) {
            error.code = data.code;
          }
        }
        return Promise.reject(error);
      });
  }
  return Promise.resolve(response);
}


// Basic api request
export function request(method, url, auth, options) {
  function basicRequest(method, url, auth, options) {  // eslint-disable-line no-shadow
    const _options = {  // eslint-disable-line no-underscore-dangle
      headers: new Headers(),
      ...options,
      method,
    };

    if (auth) {
      _options.headers.set('Authorization', `Bearer ${getAccessToken()}`);
    }

    const fullUrl = `${BASE_URL}${url}`;
    return fetch(fullUrl, _options)
      .then(checkStatus)
      .then(toJsonOrNull);
  }

  return basicRequest(method, url, auth, options)
    .catch((error) => {
      if (error.code && error.code === errorCodes.TOKEN_EXPIRED) {
        const refreshToken = getRefreshToken();
        if (refreshToken) {
          return AuthAPI.refreshAccessToken(refreshToken)
            .then((tokenData) => {
              const token = tokenData.access_token;
              setAccessToken(token);
              return basicRequest(method, url, auth, options);
            })
            .catch(() => Promise.reject(error));
        }
      }
      return Promise.reject(error);
    });
}

// shortcut: Request with JSON data
export function requestWithJson(method, url, data, auth, options) {
  let _options = { ...options };  // eslint-disable-line no-underscore-dangle

  if (data) {
    _options = {
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(data),
      ..._options,
    };
  }

  return request(method, url, auth, _options);
}

// shortcut: Auth-ed GET request
export function GET(url, options) {
  return request('GET', url, true, options);
}

// shortcut: Auth-ed POST request with JSON data
export function POST(url, data, options) {
  return requestWithJson('POST', url, data, true, options);
}

// shortcut: Auth-ed PUT request with JSON data
export function PUT(url, data, options) {
  return requestWithJson('PUT', url, data, true, options);
}

// shortcut: Auth-ed DELETE request
export function DELETE(url, options) {
  return request('DELETE', url, true, options);
}
