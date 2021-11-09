class MoviesApi {
  _url;
  _headers;
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

  getInitialFilms() {
    return fetch(this._url, {
      method: "GET",
      headers: this._headers,
    }).then(this._getResponseData);
  }
}

const moviesApi = new MoviesApi({
  url: "https://api.nomoreparties.co/beatfilm-movies",
  headers: { "Content-Type": "application/json" },
});

export default moviesApi;
