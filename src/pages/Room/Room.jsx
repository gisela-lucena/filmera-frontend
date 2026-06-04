import { useMemo, useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Heart, X, Star, Copy, ArrowLeft, Users, Play } from "lucide-react";
import { Button } from "../../components/ui/Button";
import "./room.css";
import api from "../../utils/Api.js";
import Login from "../../components/Login/Login";
import Register from "../../components/Register/Register";

const GENRES = [
    { id: 28, name: "Action" }, { id: 12, name: "Adventure" }, { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" }, { id: 80, name: "Crime" }, { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" }, { id: 10751, name: "Family" }, { id: 14, name: "Fantasy" },
    { id: 36, name: "History" }, { id: 27, name: "Horror" }, { id: 10402, name: "Music" },
    { id: 9648, name: "Mystery" }, { id: 10749, name: "Romance" }, { id: 878, name: "Sci-Fi" },
    { id: 53, name: "Thriller" }, { id: 10752, name: "War" }, { id: 37, name: "Western" },
];

const SORTS = [
    { id: "popularity.desc", name: "Most popular" },
    { id: "vote_average.desc", name: "Top rated" },
    { id: "primary_release_date.desc", name: "Newest" },
];

const YEARS = ["any", ...Array.from({ length: 30 }, (_, i) =>
    String(new Date().getFullYear() - i))];

const normalizeMovies = (movies = []) =>
    movies.map((movie) => ({
        id: movie.id || movie.tmdbId,
        title: movie.title,
        year: movie.year,
        rating: movie.rating,
        overview: movie.overview,
        poster: movie.poster || null,
    }));

export default function Room({ currentUser, onLogin, setTooltip }) {
    const { code: urlCode } = useParams();
    const navigate = useNavigate();

    const createdRoomRef = useRef(false);

    const [stage, setStage] = useState(urlCode ? "waiting" : "lobby");
    const [code, setCode] = useState(urlCode || "");
    const [joinInput, setJoinInput] = useState("");
    const [participants, setParticipants] = useState([]);
    const [movies, setMovies] = useState([]);
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(null);
    const [matched, setMatched] = useState(null);
    const [isOverviewExpanded, setIsOverviewExpanded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [selectedGenres, setSelectedGenres] = useState([]);
    const [year, setYear] = useState("any");
    const [sort, setSort] = useState("popularity.desc");
    const [isHost, setIsHost] = useState(false);

    const [isLoginOpen, setIsLoginOpen] = useState(!currentUser);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);

    const createRoom = async () => {
        try {
            setLoading(true);
            setError("");
            const room = await api.createRoom();
            const roomData = room.room || room;
            const roomCode = roomData.code;
            const normalizedMovies = normalizeMovies(roomData.movies || []);

            setCode(roomCode);
            setParticipants(roomData.participants || []);
            setMovies(normalizedMovies);
            setIsHost(true);
            setStage("config");
            createdRoomRef.current = true;
            navigate(`/room/${roomCode}`, { replace: true });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!urlCode) return;

        if (createdRoomRef.current) {
            createdRoomRef.current = false;
            return;
        }

        const autoJoinRoom = async () => {
            try {
                setLoading(true);
                setError("");

                const room = await api.joinRoom(urlCode);
                const roomData = room.room || room;
                const normalizedMovies = normalizeMovies(roomData.movies || []);

                setCode(roomData.code);
                setParticipants(roomData.participants || []);
                setMovies(normalizedMovies);
                setIsHost(false);
                setStage(normalizedMovies.length ? "swiping" : "waiting");
            } catch (err) {
                setError(err.message);
                setStage("lobby");
            } finally {
                setLoading(false);
            }
        };

        autoJoinRoom();
    }, [urlCode, currentUser]);

    useEffect(() => {
        if (!code || !currentUser || stage === "matched") return;

        const intervalId = setInterval(async () => {
            try {
                const data = await api.getRoom(code);
                const roomData = data.room || data;
                const normalizedMovies = normalizeMovies(roomData.movies || []);

                setParticipants(roomData.participants || []);

                if (normalizedMovies.length && movies.length === 0) {
                    setMovies(normalizedMovies);
                }
                if (roomData.matchedMovie) {
                    const normalizedMatch = normalizeMovies([roomData.matchedMovie])[0];

                    setMatched(normalizedMatch);
                    setStage("matched");
                }
            } catch (err) {
                console.error("Failed to refresh room:", err);
            }
        }, 3000);

        return () => clearInterval(intervalId);
    }, [code, currentUser, stage, movies.length]);

    const joinRoom = async () => {
        const roomCode = joinInput.trim().toUpperCase();
        if (!roomCode) return;

        try {
            setLoading(true);
            setError("");
            const room = await api.joinRoom(roomCode);
            const roomData = room.room || room;
            const normalizedMovies = normalizeMovies(roomData.movies || []);

            setCode(roomData.code);
            setParticipants(roomData.participants || []);
            setMovies(normalizedMovies);
            setIsHost(false);
            setStage(normalizedMovies.length ? "swiping" : "waiting");
            navigate(`/room/${roomCode}`);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const toggleGenre = (id) => {
        setSelectedGenres((currentGenres) =>
            currentGenres.includes(id)
                ? currentGenres.filter((genreId) => genreId !== id)
                : [...currentGenres, id],
        );
    };
    const startGame = async () => {
        try {
            setLoading(true);
            setError("");

            const room = await api.updateRoomFilters(code, {
                genres: selectedGenres,
                year,
                sort,
            });
            const roomData = room.room || room;
            const list = normalizeMovies(roomData.movies || []);

            if (!list.length) {
                throw new Error("No movies found for those filters.");
            }

            setMovies(list);
            setIndex(0);
            setMatched(null);
            setStage("swiping");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const swipe = (liked) => {
        const movie = movies[index];
        if (!movie) return;

        setDirection(liked ? "right" : "left");

        setTimeout(async () => {
            try {
                const result = await api.createSwipe({
                    roomCode: code,
                    movie,
                    liked,
                });
                if (result.match) {
                    setMatched(result.match);
                    setStage("matched");
                } else {
                    setIndex((currentIndex) => currentIndex + 1);
                }
                setDirection(null);
            } catch (err) {
                setError(err.message);
                setDirection(null);
            }
        }, 350);
    };
    const shareUrl = useMemo(
        () => (code ? `${window.location.origin}/room/${code}` : ""),
        [code]
    );

    const copyShare = () => {
        navigator.clipboard?.writeText(shareUrl);
    };

    const leaveRoom = () => {
        setStage("lobby");
        setCode("");
        setMovies([]);
        setMatched(null);
        setParticipants([]);
        setIsHost(false);
        navigate("/room");
    };

    const movie = movies[index];
    const hasLongOverview = Boolean(movie?.overview && movie.overview.length > 140);

    useEffect(() => {
        setIsOverviewExpanded(false);
    }, [movie?.id]);

    const toggleOverview = () => {
        if (!hasLongOverview) return;
        setIsOverviewExpanded((current) => !current);
    };

    if (!currentUser) {
        return (
            <main className="page room-page">
                <Login
                    open={isLoginOpen}
                    onClose={() => setIsLoginOpen(false)}
                    onSwitchToRegister={() => {
                        setIsLoginOpen(false);
                        setIsRegisterOpen(true);
                    }}
                    onLogin={onLogin}
                />
                <Register
                    open={isRegisterOpen}
                    onClose={() => setIsRegisterOpen(false)}
                    setTooltip={setTooltip}
                    onSwitchToLogin={() => {
                        setIsRegisterOpen(false);
                        setIsLoginOpen(true);
                    }}
                />
            </main>
        );
    }

    const overlayBadge =
        direction === "right" ? <div className="room__badge room__badge--like">LIKE</div> :
            direction === "left" ? <div className="room__badge room__badge--nope">NOPE</div> : null;

    return (
        <main className="page room-page">
            <div className="container room">
                <button className="room__back" onClick={() => navigate("/")}>
                    <ArrowLeft /> Back</button>

                {stage === "lobby" && (
                    <div className="room__panel">
                        <h1 className="room__title">Movie night, on demand</h1>
                        <p className="room__lead">Create a room or join one with a code.</p>
                        {error && <p className="room__error">{error}</p>}
                        <div className="room__lobby-grid">
                            <div className="room__card">
                                <h2 className="room__h2">Create a room</h2>
                                <p className="room__muted">Pick filters, share the code, start swiping.</p>
                                <Button
                                    variant="hero"
                                    size="xl"
                                    onClick={createRoom}
                                    disabled={loading}
                                >
                                    <Play /> {loading ? "Creating..." : "Create"}</Button>
                            </div>
                            <div className="room__card">
                                <h2 className="room__h2">Join a room</h2>
                                <input
                                    className="room__input"
                                    placeholder="ENTER CODE"
                                    value={joinInput}
                                    onChange={(e) => setJoinInput(e.target.value.toUpperCase())}
                                    maxLength={8}
                                />
                                <Button variant="glass" size="xl" onClick={joinRoom} disabled={loading}> {loading ? "Joining..." : "Join"}</Button>
                            </div>
                        </div>
                    </div>
                )}

                {stage === "config" && (
                    <div className="room__panel">
                        <div className="room__share">
                            <div>
                                <p className="room__muted">Room code</p>
                                <h2 className="room__code">{code}</h2>
                            </div>
                            <button className="room__copy" onClick={copyShare} title="Copy link"><Copy /> Copy link</button>
                        </div>

                        <h3 className="room__h3">Genres</h3>
                        <div className="room__chips">
                            {GENRES.map((genre) => (
                                <button
                                    key={genre.id}
                                    className={`room__chip ${selectedGenres.includes(genre.id) ? "room__chip--on" : ""}`}
                                    onClick={() => toggleGenre(genre.id)}
                                >{genre.name}</button>
                            ))}
                        </div>

                        <div className="room__row">
                            <div className="room__field">
                                <label className="room__label">Year</label>
                                <select className="room__select" value={year} onChange={(e) => setYear(e.target.value)}>
                                    {YEARS.map((item) => <option key={item} value={item}>{item === "any" ? "Any year" : item}</option>)}
                                </select>
                            </div>
                            <div className="room__field">
                                <label className="room__label">Sort by</label>
                                <select className="room__select" value={sort} onChange={(e) => setSort(e.target.value)}>
                                    {SORTS.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="room__participants">
                            <Users /> {participants.length} in room
                        </div>

                        {error && <p className="room__error">{error}</p>}

                        <div className="room__actions">
                            <Button variant="hero" size="xl" onClick={startGame} disabled={loading}>
                                {loading ? "Loading…" : "Start swiping"}
                            </Button>
                            <Button variant="glass" size="xl" onClick={leaveRoom}>Leave</Button>
                        </div>
                    </div>
                )}

                {stage === "waiting" && (
                    <div className="room__panel room__panel--center">
                        {loading ? (
                            <p className="room__lead">Joining room...</p>
                        ) : error ? (
                            <>
                                <h2 className="room__title">Room not found</h2>
                                <p className="room__error">{error}</p>
                                <Button variant="hero" onClick={() => navigate("/room")}>
                                    Back to rooms
                                </Button>
                            </>
                        ) : (
                            <>
                                <h2 className="room__title">
                                    You're in room <span className="text-gradient-accent">{code}</span>
                                </h2>
                                <p className="room__lead">Waiting for the host to start swiping…</p>
                                <div className="room__participants">
                                    <Users /> {participants.length} in room
                                </div>
                                <button className="room__copy" onClick={copyShare}>
                                    <Copy /> Share link
                                </button>
                            </>
                        )}
                    </div>
                )}

                {stage === "swiping" && (
                    <div className="room__panel">
                        <div className="room__share">
                            <div>
                                <p className="room__muted">Room</p>
                                <h2 className="room__code">{code}</h2>
                            </div>
                            <div className="room__participants"><Users /> {participants.length}</div>
                        </div>

                        {!movie ? (
                            <div className="room__empty">
                                <p>Out of movies! {isHost && "Reload filters to fetch more."}</p>
                                {isHost && (<Button variant="hero" onClick={() => setStage("config")}>Back to filters</Button>)}
                            </div>
                        ) : (
                            <>
                                <div className="room__deck">
                                    <div className={`room__movie ${direction === "left" ? "anim-left" : direction === "right" ? "anim-right" : ""}`}>
                                        {movie.poster
                                            ? <img src={movie.poster} alt={movie.title} />
                                            : <div className="room__movie-fallback">🎬</div>}
                                        <div className="room__movie-fade" />
                                        {overlayBadge}
                                        <div className="room__movie-info">
                                            <div className="room__meta"><Star /> {movie.rating} • {movie.year}</div>
                                            <h3 className="room__movie-title">{movie.title}</h3>
                                            <p
                                                className={`room__movie-overview ${hasLongOverview ? "room__movie-overview--clickable" : ""} ${isOverviewExpanded ? "room__movie-overview--expanded" : ""}`}
                                                role={hasLongOverview ? "button" : undefined}
                                                tabIndex={hasLongOverview ? 0 : undefined}
                                                aria-expanded={isOverviewExpanded}
                                                aria-label={hasLongOverview ? `${isOverviewExpanded ? "Collapse" : "Expand"} synopsis` : undefined}
                                                onClick={toggleOverview}
                                                onKeyDown={(event) => {
                                                    if (!hasLongOverview) return;
                                                    if (event.key === "Enter" || event.key === " ") {
                                                        event.preventDefault();
                                                        toggleOverview();
                                                    }
                                                }}
                                            >
                                                {isOverviewExpanded
                                                    ? (movie.overview || "No synopsis available.")
                                                    : `${movie.overview?.slice(0, 140) || "No synopsis available."}${movie.overview?.length > 140 ? "…" : ""}`}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="room__controls">
                                    <button className="room__fab room__fab--skip" onClick={() => swipe(false)} aria-label="Skip"><X /></button>
                                    <button className="room__fab room__fab--like" onClick={() => swipe(true)} aria-label="Like"><Heart /></button>
                                </div>
                            </>
                        )}
                    </div>
                )}

                {stage === "matched" && matched && (
                    <div className="room__panel room__panel--center">
                        <div className="room__match-emoji">🎉</div>
                        <p className="room__muted">It's a match!</p>
                        <h2 className="room__title">{matched.title}</h2>
                        <p className="room__lead">{matched.overview}</p>
                        {matched.poster && <img className="room__match-poster" src={matched.poster} alt={matched.title} />}
                        <div className="room__actions-center">
                            <Button variant="hero" size="xl" onClick={async () => {
                                try {
                                    await api.clearMatch(code);
                                    setMatched(null);
                                    setStage("swiping");
                                    setIndex((currentIndex) => currentIndex + 1);
                                } catch (err) {
                                    setError(err.message);
                                }
                            }}>Keep swiping
                            </Button>
                            <Button variant="glass" size="xl" onClick={leaveRoom}>Leave room</Button>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
