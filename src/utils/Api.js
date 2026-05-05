class Api {
  constructor({ baseUrl, token }) {
    this._baseUrl = baseUrl;
    this._token = token;
  }

  _handleServerResponse(res) {
    if (res.ok) {
      return res.json()
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

  getPopularMovies() {
    return this._request("/movie/popular?language=en-US&page=1");
  }

  getTopRatedMovies() {
    return this._request("/movie/top_rated?language=en-US&page=1");
  }

  getGenres() {
    return this._request("/genre/movie/list?language=en-US");
  }

  getMoviesByGenre(genreId) {
    return this._request(
      `/discover/movie?with_genres=${genreId}&language=en-US&page=1`,
    );
  }

  getMoviesByGenreAndYear(genreId, year, page = 1) {
    return this._request(
      `/discover/movie?language=en-US&page=${page}&with_genres=${genreId}&primary_release_year=${year}`,
    );
  }

  getMovieDetails(movieId) {
    return this._request(`/movie/${movieId}?language=en-US`);
  }

  getDiscoverMovies({ genres, year, sort }) {
    const params = new URLSearchParams({
      sort_by: sort,
      include_adult: "false",
      "vote_count.gte": "100",
      page: "1",
    });

    if (genres?.length) params.set("with_genres", genres.join(","));
    if (year && year !== "any") params.set("primary_release_year", year);

    return this._request(`/discover/movie?${params}`);
  }
}

const api = new Api({
  baseUrl:
    import.meta.env.VITE_TMDB_API_BASE_URL || "https://api.themoviedb.org/3",
  token: import.meta.env.VITE_TMDB_TOKEN,
});

export default api;
