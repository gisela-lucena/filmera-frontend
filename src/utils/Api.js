const DEFAULT_LANGUAGE = "en-US";
const DEFAULT_PAGE = 1;

class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _handleServerResponse(res) {
    if (res.ok) {
      return res.json();
    }
    if (res.status === 401) {
      console.error("Unauthorized access - invalid or expired token.");
    }

    return Promise.reject(new Error(`Error: ${res.status}`));
  }

  _request(endpoint, options = {}) {
    return fetch(`${this._baseUrl}${endpoint}`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${this._token}`,
        ...options.headers,
      },
      ...options,
    }).then(this._handleServerResponse);
  }

  //login
  //register
  //rota banco de dados para pegar sala, movies, etc para o backend ver que solicitao foi feita no frontend.
  
}

const api = new Api({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
});

export default api;
