import { useEffect, useMemo, useState } from "react";
import { Heart, Star, X } from "lucide-react";
import { Button } from "../ui/Button";
import apiMovie from "../../utils/apiMovie.js";

const IMG = "https://image.tmdb.org/t/p/w500";

const SwipeDemo = () => {
    const [movies, setMovies] = useState([]);
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(null);
    const [matched, setMatched] = useState(null);

    useEffect(() => {
        async function fetchMovies() {
            try {
                const data = await A.getPopularMovies();
                const list = (data.results || []).slice(0, 10).map((m) => ({
                    id: m.id,
                    title: m.title,
                    year: (m.release_date || "").slice(0, 4),
                    rating: m.vote_average?.toFixed(1),
                    overview: m.overview,
                    poster: m.poster_path ? `${IMG}${m.poster_path}` : null,
                }));
                setMovies(list);
            } catch (error) {
                console.error("Error loading SwipeDemo movies:", error);
            }
        }
        fetchMovies();
    }, []);

    const movie = movies.length ? movies[index % movies.length] : null;
    const next = movies.length ? movies[(index + 1) % movies.length] : null;

    const swipe = (dir) => {
        setDirection(dir);
        setTimeout(() => {
            if (dir === "right" && Math.random() > 0.45) setMatched(movie);
            setIndex((i) => i + 1);
            setDirection(null);
        }, 1000);
    };

    const reset = () => { setMatched(null); setIndex(0); };

    const overlayBadge = useMemo(() => {
        if (direction === "right") return <div className="swipe__badge swipe__badge--like">LIKE</div>;
        if (direction === "left") return <div className="swipe__badge swipe__badge--nope">NOPE</div>;
        return null;
    }, [direction]);

    return (
        <section id="demo" className="container section">
            <div className="section__head--center">
                <p className="section__eyebrow">Try it</p>
                <h2 className="section__title">Swipe a few films. Feel the magic.</h2>
                <p className="section__lead">A tiny taste of FILMERA. Your real room syncs with everyone live.</p>
            </div>

            <div className="swipe__deck">
                {movie && (
                    <div
                        className={`swipe__card ${direction === "left"
                            ? "animate-swipe-left"
                            : direction === "right"
                                ? "animate-swipe-right"
                                : ""
                            }`} >
                        {movie.poster ? (
                            <img src={movie.poster} alt={movie.title} />
                        ) : (
                            <div className="swipe__emoji">🎬</div>
                        )}
                        <div className="swipe__fade" />
                        {overlayBadge}
                        <div className="swipe__info">
                            <div className="swipe__meta">
                                <Star /> {movie.rating} • {movie.year}
                            </div>
                            <h3 className="swipe__title">{movie.title}</h3>
                            <p className="swipe__genre">{movie.genre}</p>
                        </div>
                    </div>
                )}
                {matched && (
                    <div className="swipe__match animate-fade-up">
                        <div>
                            <div className="swipe__match-emoji">🎉</div>
                            <p className="swipe__match-label">It's a match!</p>
                            <h4 className="swipe__match-title">{matched.title}</h4>
                            <Button variant="hero" onClick={reset}>
                                Keep swiping
                            </Button>
                        </div>
                    </div>
                )}
            </div>
            <div className="swipe__controls">
                <button
                    onClick={() => swipe("left")}
                    className="swipe__fab swipe__fab--skip"
                >
                    <X />
                </button>
                <button
                    onClick={() => swipe("right")}
                    className="swipe__fab swipe__fab--like">
                    <Heart />
                </button>
            </div>
        </section>
    );
};

export default SwipeDemo;