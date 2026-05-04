import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Heart, X, Star, Copy, ArrowLeft, Users, Play } from "lucide-react";
import { Button } from "../../components/ui/Button";
import "./room.css";
import api from "../../utils/Api.js";

const IMG = "https://image.tmdb.org/t/p/w500";

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

const YEARS = ["any", ...Array.from({ length: 30 }, (_, i) => String(new Date().getFullYear() - i))];

function genCode() {
    return Math.random().toString(36).slice(2, 8).toUpperCase();
}

function loadRoom(code) {
    try { return JSON.parse(localStorage.getItem(`filmera:room:${code}`) || "null"); } catch { return null; }
}
function saveRoom(code, data) {
    localStorage.setItem(`filmera:room:${code}`, JSON.stringify(data));
}

export default function Room() {
    const { code: urlCode } = useParams();
    const navigate = useNavigate();

    // Stages: "lobby" (no code) -> create or join
    // "config" -> host picks filters
    // "waiting" -> waiting for participants
    // "swiping" -> swipe deck
    // "matched" -> a match!
    const [stage, setStage] = useState(urlCode ? "joining" : "lobby");
    const [code, setCode] = useState(urlCode || "");
    const [joinInput, setJoinInput] = useState("");
    const [me] = useState(() => Math.random().toString(36).slice(2, 10));
    const [participants, setParticipants] = useState([]);
    const [movies, setMovies] = useState([]);
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(null);
    const [matched, setMatched] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Filters (host)
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [year, setYear] = useState("any");
    const [sort, setSort] = useState("popularity.desc");

    const channelRef = useRef(null);

    // Setup BroadcastChannel for the room
    useEffect(() => {
        if (!code) return;
        const ch = new BroadcastChannel(`filmera-room-${code}`);
        channelRef.current = ch;

        ch.onmessage = (e) => {
            const { type, payload, from } = e.data || {};
            if (from === me) return;
            const room = loadRoom(code);
            if (!room) return;

            if (type === "hello") {
                // Host responds with current state
                if (room.host === me) {
                    ch.postMessage({ type: "state", from: me, payload: room });
                }
            } else if (type === "state") {
                setParticipants(payload.participants || []);
                setMovies(payload.movies || []);
                if (payload.movies?.length && stage !== "swiping" && stage !== "matched") {
                    setStage("swiping");
                }
            } else if (type === "join") {
                if (room.host === me) {
                    if (!room.participants.includes(payload.id)) {
                        room.participants.push(payload.id);
                        saveRoom(code, room);
                    }
                    setParticipants([...room.participants]);
                    ch.postMessage({ type: "state", from: me, payload: room });
                }
            } else if (type === "start") {
                setMovies(payload.movies);
                setIndex(0);
                setMatched(null);
                setStage("swiping");
            } else if (type === "swipe") {
                // payload: { userId, movieId, liked }
                if (room.host === me) {
                    room.swipes = room.swipes || {};
                    room.swipes[payload.movieId] = room.swipes[payload.movieId] || {};
                    room.swipes[payload.movieId][payload.userId] = payload.liked;
                    saveRoom(code, room);
                    // Check match: every participant liked
                    const likes = room.swipes[payload.movieId];
                    if (room.participants.every((p) => likes[p] === true)) {
                        const movie = (room.movies || []).find((m) => m.id === payload.movieId);
                        if (movie) ch.postMessage({ type: "match", from: me, payload: movie });
                        setMatched(movie || null);
                        setStage("matched");
                    }
                }
            } else if (type === "match") {
                setMatched(payload);
                setStage("matched");
            }
        };

        return () => ch.close();
    }, [code, me, stage]);

    // Auto-join flow when arriving via URL
    useEffect(() => {
        if (stage !== "joining" || !code) return;
        const room = loadRoom(code);
        if (room) {
            // existing room (same browser)
            if (!room.participants.includes(me)) {
                room.participants.push(me);
                saveRoom(code, room);
            }
            setParticipants(room.participants);
            setMovies(room.movies || []);
            setStage(room.movies?.length ? "swiping" : "waiting");
        } else {
            setStage("waiting");
        }
        // ping host (other tab) for state
        setTimeout(() => {
            channelRef.current?.postMessage({ type: "join", from: me, payload: { id: me } });
            channelRef.current?.postMessage({ type: "hello", from: me });
        }, 50);
    }, [code, stage, me]);

    const createRoom = () => {
        const c = genCode();
        saveRoom(c, { host: me, participants: [me], movies: [], swipes: {} });
        setCode(c);
        setParticipants([me]);
        setStage("config");
        navigate(`/room/${c}`, { replace: true });
    };

    const joinRoom = () => {
        const c = joinInput.trim().toUpperCase();
        if (!c) return;
        setCode(c);
        setStage("joining");
        navigate(`/room/${c}`);
    };

    const toggleGenre = (id) => {
        setSelectedGenres((g) => g.includes(id) ? g.filter(x => x !== id) : [...g, id]);
    };

    const fetchMovies = async () => {
        setLoading(true);
        setError("");

        try {
            const data = await api.getDiscoverMovies({
                genres: selectedGenres,
                year,
                sort,
            });

            const list = (data.results || []).slice(0, 20).map((m) => ({
                id: m.id,
                title: m.title,
                year: (m.release_date || "").slice(0, 4),
                rating: m.vote_average?.toFixed(1),
                overview: m.overview,
                poster: m.poster_path ? `${IMG}${m.poster_path}` : null,
            }));

            if (!list.length) {
                throw new Error("No movies found for those filters.");
            }

            return list;
        } catch (e) {
            setError(e.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const startGame = async () => {
        const list = await fetchMovies();
        if (!list) return;
        const room = loadRoom(code) || { host: me, participants: [me], swipes: {} };
        room.movies = list;
        room.swipes = {};
        saveRoom(code, room);
        setMovies(list);
        setIndex(0);
        setMatched(null);
        setStage("swiping");
        channelRef.current?.postMessage({ type: "start", from: me, payload: { movies: list } });
    };

    const swipe = (liked) => {
        const movie = movies[index];
        if (!movie) return;
        setDirection(liked ? "right" : "left");
        setTimeout(() => {
            // Record swipe
            const room = loadRoom(code);
            if (room) {
                room.swipes = room.swipes || {};
                room.swipes[movie.id] = room.swipes[movie.id] || {};
                room.swipes[movie.id][me] = liked;
                saveRoom(code, room);
                // Self-check match
                if (liked && room.participants.every((p) => room.swipes[movie.id][p] === true)) {
                    setMatched(movie);
                    setStage("matched");
                    channelRef.current?.postMessage({ type: "match", from: me, payload: movie });
                }
            }
            channelRef.current?.postMessage({ type: "swipe", from: me, payload: { userId: me, movieId: movie.id, liked } });
            setDirection(null);
            setIndex((i) => i + 1);
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
        navigate("/room");
    };

    const isHost = () => {
        const r = code ? loadRoom(code) : null;
        return r?.host === me;
    };

    const movie = movies[index];
    const overlayBadge =
        direction === "right" ? <div className="room__badge room__badge--like">LIKE</div> :
            direction === "left" ? <div className="room__badge room__badge--nope">NOPE</div> : null;

    return (
        <main className="page room-page">
            <div className="container room">
                <button className="room__back" onClick={() => navigate("/")}><ArrowLeft /> Back</button>

                {stage === "lobby" && (
                    <div className="room__panel">
                        <h1 className="room__title">Movie night, on demand</h1>
                        <p className="room__lead">Create a room or join one with a code. No signup needed.</p>
                        <div className="room__lobby-grid">
                            <div className="room__card">
                                <h2 className="room__h2">Create a room</h2>
                                <p className="room__muted">Pick filters, share the code, start swiping.</p>
                                <Button variant="hero" size="xl" onClick={createRoom}><Play /> Create</Button>
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
                                <Button variant="glass" size="xl" onClick={joinRoom}>Join</Button>
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
                            {GENRES.map((g) => (
                                <button
                                    key={g.id}
                                    className={`room__chip ${selectedGenres.includes(g.id) ? "room__chip--on" : ""}`}
                                    onClick={() => toggleGenre(g.id)}
                                >{g.name}</button>
                            ))}
                        </div>

                        <div className="room__row">
                            <div className="room__field">
                                <label className="room__label">Year</label>
                                <select className="room__select" value={year} onChange={(e) => setYear(e.target.value)}>
                                    {YEARS.map((y) => <option key={y} value={y}>{y === "any" ? "Any year" : y}</option>)}
                                </select>
                            </div>
                            <div className="room__field">
                                <label className="room__label">Sort by</label>
                                <select className="room__select" value={sort} onChange={(e) => setSort(e.target.value)}>
                                    {SORTS.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
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
                        <h2 className="room__title">You're in room <span className="text-gradient-accent">{code}</span></h2>
                        <p className="room__lead">Waiting for the host to start swiping…</p>
                        <div className="room__participants"><Users /> {participants.length} in room</div>
                        <button className="room__copy" onClick={copyShare}><Copy /> Share link</button>
                    </div>
                )}

                {stage === "joining" && (
                    <div className="room__panel room__panel--center">
                        <p className="room__lead">Joining room <strong>{code}</strong>…</p>
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
                                <p>Out of movies! {isHost() && "Reload filters to fetch more."}</p>
                                {isHost() && <Button variant="hero" onClick={() => setStage("config")}>Back to filters</Button>}
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
                                            <p className="room__movie-overview">{movie.overview?.slice(0, 140)}{movie.overview?.length > 140 ? "…" : ""}</p>
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
                            <Button variant="hero" size="xl" onClick={() => { setMatched(null); setStage("swiping"); setIndex(i => i + 1); }}>
                                Keep swiping
                            </Button>
                            <Button variant="glass" size="xl" onClick={leaveRoom}>Leave room</Button>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
