class MainApi {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  register(userData) {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        password: userData.password,
        email: userData.email,
        name: userData.name,
      }),
    }).then(this._getResponseData);
  }

  login(userData) {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        password: userData.password,
        email: userData.email,
      }),
    }).then(this._getResponseData);
  }

  checkToken(jwt) {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${jwt}`,
      },
    }).then(this._getResponseData);
  }

  updateUserData(userData) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: userData.name,
      }),
    }).then(this._getResponseData);
  }

  toggleFinmInFavorite(data, state) {
    if (state) {
      return fetch(`${this._url}/movies/${data._id}`, {
        method: "DELETE",
        headers: this._headers,
      }).then(this._getResponseData);
    } else {
      return fetch(`${this._url}/movies`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify(data),
      }).then(this._getResponseData);
    }
  }
}

const mainApi = new MainApi({
  url: "https://api.movies.dip.nomoredomains.monster",
  headers: { "Content-Type": "application/json" },
});

export default mainApi;
