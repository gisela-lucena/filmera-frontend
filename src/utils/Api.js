class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleServerResponse(res) {
    if (res.ok) {
      return res.json().then((payload) => payload?.data ?? payload);
    }

    return Promise.reject(new Error(`Error: ${res.status}`));
  }

  _request(url, options = {}) {
    return fetch(`${this._baseUrl}${url}`, {
      headers: this._headers,
      ...options,
    }).then(this._handleServerResponse);
  }

  getInitialData() {
    return Promise.all([this.getUser(), this.getInitialCards()]);
  }

  getUser() {
    return this._request("/users/me");
  }

  getInitialCards() {
    return this._request("/cards");
  }

  setUserInfo(name, about) {
    return this._request("/users/me", {
      method: "PATCH",
      body: JSON.stringify({ name, about }),
    });
  }

  addNewCard(name, link) {
    return this._request("/cards", {
      method: "POST",
      body: JSON.stringify({ name, link }),
    });
  }

  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, {
      method: "DELETE",
    });
  }

  likeCard(cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: "PUT",
    });
  }

  unlikeCard(cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: "DELETE",
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    return isLiked ? this.likeCard(cardId) : this.unlikeCard(cardId);
  }

  updateAvatar(avatarLink) {
    return this._request("/users/me/avatar", {
      method: "PATCH",
      body: JSON.stringify({ avatar: avatarLink }),
    });
  }
}

const TOKEN = import.meta.env.VITE_TMDB_TOKEN;
const api = new Api({
  baseUrl:
    import.meta.env.VITE_TMDB_API_BASE_URL || "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TOKEN}`,
  },
});

export default api;
