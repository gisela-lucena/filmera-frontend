import { useMemo, useState } from "react";
import { Heart, Star, X } from "lucide-react";
import { Button } from "./ui/Button";

const MOVIES = [
    { title: "Inception", year: 2010, genre: "Sci-Fi • Thriller", rating: 8.8, gradient: "swipe__g--indigo", emoji: "🌀" },
    { title: "La La Land", year: 2016, genre: "Romance • Musical", rating: 8.0, gradient: "swipe__g--pink", emoji: "🎷" },
    { title: "Interstellar", year: 2014, genre: "Sci-Fi • Drama", rating: 8.7, gradient: "swipe__g--slate", emoji: "🚀" },
    { title: "The Grand Budapest Hotel", year: 2014, genre: "Comedy • Drama", rating: 8.1, gradient: "swipe__g--rose", emoji: "🛎️" },
    { title: "Spirited Away", year: 2001, genre: "Animation • Fantasy", rating: 8.6, gradient: "swipe__g--fuchsia", emoji: "🐉" },
];

const SwipeDemo = () => {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(null);
    const [matched, setMatched] = useState(null);

    const movie = MOVIES[index % MOVIES.length];
    const next = MOVIES[(index + 1) % MOVIES.length];

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
                <div className={`swipe__peek ${next.gradient}`} />
                <div
                    className={`swipe__card ${movie.gradient} ${direction === "left" ? "animate-swipe-left" : direction === "right" ? "animate-swipe-right" : ""
                        }`}
                >
                    <div className="swipe__emoji">{movie.emoji}</div>
                    <div className="swipe__fade" />
                    {overlayBadge}
                    <div className="swipe__info">
                        <div className="swipe__meta"><Star /> {movie.rating} • {movie.year}</div>
                        <h3 className="swipe__title">{movie.title}</h3>
                        <p className="swipe__genre">{movie.genre}</p>
                    </div>
                </div>

                {matched && (
                    <div className="swipe__match animate-fade-up">
                        <div>
                            <div className="swipe__match-emoji">🎉</div>
                            <p className="swipe__match-label">It's a match!</p>
                            <h4 className="swipe__match-title">{matched.title}</h4>
                            <p className="swipe__match-text">You both liked this one. Time to press play.</p>
                            <Button variant="hero" onClick={reset}>Keep swiping</Button>
                        </div>
                    </div>
                )}
            </div>

            <div className="swipe__controls">
                <button onClick={() => swipe("left")} className="swipe__fab swipe__fab--skip" aria-label="Skip"><X /></button>
                <button onClick={() => swipe("right")} className="swipe__fab swipe__fab--like animate-pulse-glow" aria-label="Like"><Heart /></button>
            </div>
        </section>
    );
};
export default SwipeDemo;
