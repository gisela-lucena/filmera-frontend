export const FAVORITES_UPDATED_EVENT = "filmera:favorites-updated";

export const getMovieFavoriteId = (movie) =>
  String(movie?.tmdbId || movie?.id || "");

export const normalizeFavoriteMovies = (favorites = []) =>
  favorites.map((movie) => ({
    id: movie.id || movie.tmdbId,
    tmdbId: movie.tmdbId || movie.id,
    title: movie.title,
    year: movie.year || "",
    rating: movie.rating || "N/A",
    certification: movie.certification || movie.contentRating || "",
    overview: movie.overview || "",
    poster: movie.poster || null,
    savedAt: movie.savedAt || "",
  }));

export const emitFavoritesUpdated = () => {
  window.dispatchEvent(new CustomEvent(FAVORITES_UPDATED_EVENT));
};
