import logo from "../../images/filmera-logo.png";
import { Button } from "../ui/Button";
import { useEffect, useRef, useState } from "react";
import Login from "../Login/Login";
import Register from "../Register/Register";
import { Edit3, Film, LogOut, Settings, Trash2 } from "lucide-react";
import api from "../../utils/Api.js";
import { emitFavoritesUpdated, FAVORITES_UPDATED_EVENT, getMovieFavoriteId, normalizeFavoriteMovies } from "../../utils/favorites.js";

const Navbar = ({ currentUser, onLogin, onForgotPassword, onLogout, shouldOpenLogin, redirectAfterLogin, setTooltip }) => {
    const accountMenuRef = useRef(null);
    const [isLoginOpen, setIsLoginOpen] = useState(Boolean(shouldOpenLogin));
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [isAccountOpen, setIsAccountOpen] = useState(false);
    const [isEditingFavorites, setIsEditingFavorites] = useState(false);
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const [favoritesError, setFavoritesError] = useState("");

    useEffect(() => {
        const refreshFavorites = async () => {
            if (!currentUser) {
                setFavoriteMovies([]);
                return;
            }

            try {
                setFavoritesError("");
                const data = await api.getFavoriteMovies();
                setFavoriteMovies(normalizeFavoriteMovies(data.favorites || data));
            } catch (err) {
                setFavoritesError(
                    err.message === "Error: 404"
                        ? "Favorites are not available on this server yet."
                        : err.message || "Could not load favorites.",
                );
            }
        };

        refreshFavorites();
        window.addEventListener(FAVORITES_UPDATED_EVENT, refreshFavorites);

        return () => {
            window.removeEventListener(FAVORITES_UPDATED_EVENT, refreshFavorites);
        };
    }, [currentUser]);

    useEffect(() => {
        const handleDocumentClick = (event) => {
            if (!accountMenuRef.current?.contains(event.target)) {
                setIsAccountOpen(false);
                setIsEditingFavorites(false);
            }
        };

        document.addEventListener("mousedown", handleDocumentClick);
        return () => document.removeEventListener("mousedown", handleDocumentClick);
    }, []);

    const handleRemoveFavorite = async (movieId) => {
        try {
            setFavoritesError("");
            const data = await api.removeFavoriteMovie(movieId);
            setFavoriteMovies(normalizeFavoriteMovies(data.favorites || data));
            emitFavoritesUpdated();
        } catch (err) {
            setFavoritesError(
                err.message === "Error: 404"
                    ? "Favorites are not available on this server yet."
                    : err.message || "Could not remove favorite.",
            );
        }
    };

    return (
        <header className="navbar">
            <nav className="container navbar__nav">
                <a href="#" className="navbar__brand">
                    <img src={logo} alt="FILMERA logo" width={36} height={36} className="navbar__logo" />
                    <span className="navbar__brand-text">FILM<span className="navbar__brand-accent">ERA</span></span>
                </a>
                <div className="navbar__links">
                    <a href="#how">How it works</a>
                    <a href="#features">Features</a>
                    <a href="#demo">Try demo</a>
                </div>
                {!currentUser ? (
                    <div className="navbar__actions">
                        <Button variant="glass" size="sm" onClick={() => {
                            setIsLoginOpen(false);
                            setIsRegisterOpen(true);
                        }}> Register </Button>
                        <Button variant="hero" size="sm" onClick={() => {
                            setIsRegisterOpen(false);
                            setIsLoginOpen(true);
                        }}> Login </Button>
                    </div>) : (<div className="navbar__actions navbar__account" ref={accountMenuRef}>
                        <Button
                            variant="glass"
                            size="sm"
                            onClick={() => setIsAccountOpen((isOpen) => !isOpen)}
                            aria-expanded={isAccountOpen}
                        >
                            {currentUser.name}
                            <Settings />
                        </Button>
                        {isAccountOpen && (
                            <div className="navbar__account-menu">
                                <div className="navbar__account-head">
                                    <div>
                                        <p className="navbar__account-kicker">Account Settings</p>
                                        <strong>{currentUser.name}</strong>
                                    </div>
                                    <button className="navbar__icon-button" type="button" onClick={onLogout} title="Logout">
                                        <LogOut />
                                    </button>
                                </div>

                                <section className="navbar__favorites">
                                    <div className="navbar__favorites-head">
                                        <div>
                                            <p className="navbar__account-kicker">Favorites</p>
                                            <strong>{favoriteMovies.length} saved</strong>
                                        </div>
                                        <button
                                            className="navbar__edit-button"
                                            type="button"
                                            onClick={() => setIsEditingFavorites((isEditing) => !isEditing)}
                                            disabled={!favoriteMovies.length}
                                        >
                                            <Edit3 />
                                            {isEditingFavorites ? "Done" : "Edit"}
                                        </button>
                                    </div>

                                    {favoriteMovies.length ? (
                                        <div className="navbar__favorite-list">
                                            {favoriteMovies.map((movie) => (
                                                <article className="navbar__favorite-item" key={getMovieFavoriteId(movie)}>
                                                    {movie.poster ? (
                                                        <img src={movie.poster} alt="" />
                                                    ) : (
                                                        <div className="navbar__favorite-fallback"><Film /></div>
                                                    )}
                                                    <div className="navbar__favorite-copy">
                                                        <strong>{movie.title}</strong>
                                                        <span>{movie.year || "Year unknown"} · TMDB {movie.rating || "N/A"}</span>
                                                    </div>
                                                    {isEditingFavorites && (
                                                        <button
                                                            className="navbar__delete-favorite"
                                                            type="button"
                                                            onClick={() => handleRemoveFavorite(getMovieFavoriteId(movie))}
                                                            aria-label={`Remove ${movie.title} from favorites`}
                                                        >
                                                            <Trash2 />
                                                        </button>
                                                    )}
                                                </article>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="navbar__favorites-empty">Save movies from a room to watch later.</p>
                                    )}
                                    {favoritesError && <p className="navbar__favorites-error">{favoritesError}</p>}
                                </section>
                            </div>
                        )}
                    </div>
                )}
            </nav>
            <Login
                open={isLoginOpen}
                onClose={() => setIsLoginOpen(false)}
                onSwitchToRegister={() => {
                    setIsLoginOpen(false);
                    setIsRegisterOpen(true);
                }}
                onLogin={onLogin}
                onForgotPassword={onForgotPassword}
                redirectAfterLogin={redirectAfterLogin}
                setTooltip={setTooltip}
            />
            <Register
                open={isRegisterOpen}
                onClose={() => setIsRegisterOpen(false)}
                setTooltip={setTooltip}
                onSwitchToLogin={() => { setIsRegisterOpen(false); setIsLoginOpen(true); }}
            />
        </header >
    );
};
export default Navbar;
