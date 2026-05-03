import { useQuery } from "@tanstack/react-query";
import api from "../utils/Api.js";

export default function Movies({ genreId, year }) {
    const { data } = useQuery({
        queryKey: ["movies", genreId, year],
        queryFn: () => {
            if (genreId && year) {
                return api.getMoviesByGenreAndYear(genreId, year);
            }
            if (genreId) {
                return api.getMoviesByGenre(genreId);
            }
            return api.getPopularMovies();
        },
    });

    return data?.results.map((movie) => (
        <p key={movie.id}>{movie.title}</p>
    ));
}