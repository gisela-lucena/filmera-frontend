const DEFAULT_LANGUAGE = "en-US";
const DEFAULT_PAGE = 1;

class ApiMovie {
  constructor({ baseUrl, token }) {
    this._baseUrl = baseUrl;
    this._token = token;
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

  getPopularMovies() {
    return this._request(
      `/movie/popular?language=${DEFAULT_LANGUAGE}&page=${DEFAULT_PAGE}`,
    );
  }

  getTopRatedMovies() {
    return this._request(
      `/movie/top_rated?language=${DEFAULT_LANGUAGE}&page=${DEFAULT_PAGE}`,
    );
  }

  getGenres() {
    return this._request(`/genre/movie/list?language=${DEFAULT_LANGUAGE}`);
  }

  getMoviesByGenre(genreId) {
    return this._request(
      `/discover/movie?with_genres=${genreId}&language=${DEFAULT_LANGUAGE}&page=${DEFAULT_PAGE}`,
    );
  }

  getMoviesByGenreAndYear(genreId, year, page = 1) {
    return this._request(
      `/discover/movie?language=${DEFAULT_LANGUAGE}&page=${page}&with_genres=${genreId}&primary_release_year=${year}`,
    );
  }

  getMovieDetails(movieId) {
    return this._request(`/movie/${movieId}?language=${DEFAULT_LANGUAGE}`);
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

const apiMovie = new ApiMovie({
  baseUrl: import.meta.env.VITE_TMDB_API_BASE_URL,
  token: import.meta.env.TMDB_TOKEN,
});

export default apiMovie;
