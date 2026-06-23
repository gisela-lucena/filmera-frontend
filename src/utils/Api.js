class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _getToken() {
    return localStorage.getItem("jwt");
  }

  _handleServerResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return res
      .json()
      .catch(() => ({}))
      .then((err) => {
        return Promise.reject(new Error(err.message || `Error: ${res.status}`));
      });
  }

  _request(endpoint, options = {}) {
    const token = this._getToken();

    return fetch(`${this._baseUrl}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    }).then(this._handleServerResponse);
  }

  signup({ name, email, password }) {
    return this._request("/signup", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });
  }

  signin({ email, password }) {
    return this._request("/signin", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  forgotPassword({ email }) {
    return this._request("/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  }

  resetPassword({ token, password }) {
    return this._request("/reset-password", {
      method: "POST",
      body: JSON.stringify({ token, password }),
    });
  }

  createLead({ email }) {
    return this._request("/leads", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  }

  getCurrentUser() {
    return this._request("/users/me");
  }

  createRoom({ filters } = {}) {
    const body = filters ? { filters } : {};

    return this._request("/rooms", {
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  getRoom(roomCode) {
    return this._request(`/rooms/${roomCode}`);
  }

  updateRoomFilters(roomCode, filters) {
    return this._request(`/rooms/${roomCode}/filters`, {
      method: "PATCH",
      body: JSON.stringify({ filters }),
    });
  }

  joinRoom(roomCode) {
    return this._request(`/rooms/${roomCode}/join`, {
      method: "POST",
    });
  }

  leaveRoom(roomCode) {
    return this._request(`/rooms/${roomCode}/leave`, {
      method: "POST",
    });
  }

  getMoviesInRoom(roomCode) {
    return this._request(`/rooms/${roomCode}/movies`);
  }

  addMovieToRoom(roomCode, movie) {
    return this._request(`/rooms/${roomCode}/movies`, {
      method: "POST",
      body: JSON.stringify({ movie }),
    });
  }

  removeMovieFromRoom(roomCode, movieId) {
    return this._request(`/rooms/${roomCode}/movies/${movieId}`, {
      method: "DELETE",
    });
  }

  createSwipe({ roomCode, movie, liked }) {
    return this._request("/swipes", {
      method: "POST",
      body: JSON.stringify({
        roomCode,
        movieId: movie.id || movie.tmdbId,
        liked,
      }),
    });
  }

  getNextMovies(roomCode) {
    return this._request(`/rooms/${roomCode}/next-movies`);
  }

  getMatches(roomCode) {
    return this._request(`/rooms/${roomCode}/matches`);
  }

  getPopularMovies() {
    return this._request("/movies/popular");
  }

  getTopRatedMovies() {
    return this._request("/movies/top-rated");
  }

  getGenres() {
    return this._request("/movies/genres");
  }

  getMoviesByGenre(genreId) {
    return this._request(`/movies/discover?genreId=${genreId}`);
  }

  getMoviesByGenreAndYear(genreId, year, page = 1) {
    return this._request(
      `/movies/discover?genreId=${genreId}&year=${year}&page=${page}`,
    );
  }

  getMovieDetails(movieId) {
    return this._request(`/movies/${movieId}`);
  }

  getDiscoverMovies({ genres, year, sort, providers } = {}) {
    const params = new URLSearchParams();
    if (genres?.length) {
      params.append("genres", genres.join(","));
    }
    if (providers?.length) {
      params.append("providers", providers.join(","));
    }
    if (year && year !== "any") {
      params.append("year", year);
    }
    if (sort) {
      params.append("sort", sort);
    }
    return this._request(`/movies?${params.toString()}`);
  }

  clearMatch(roomCode) {
    return this._request(`/rooms/${roomCode}/match/clear`, {
      method: "PATCH",
    });
  }

  getMovieCredits(movieId) {
    return this._request(`/movies/${movieId}/credits`);
  }

  getMovieWatchProviders(movieId, region) {
    const params = new URLSearchParams();
    if (region) {
      params.append("region", region);
    }

    return this._request(
      `/movies/${movieId}/watch-providers${params.toString() ? `?${params.toString()}` : ""}`,
    );
  }
}

const api = new Api({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
});

export default api;
