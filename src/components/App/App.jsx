import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DeleteAccount from "../../pages/DeleteAccount/DeleteAccount.jsx";
import Index from "../../pages/Index.jsx";
import Leads from "../../pages/Leads/Leads.jsx";
import NotFound from "../../pages/NotFound/NotFound.jsx";
import Privacy from "../../pages/Privacy/Privacy.jsx";
import ResetPassword from "../../pages/ResetPassword/ResetPassword.jsx";
import Room from "../../pages/Room/Room.jsx";
import Terms from "../../pages/Terms/Terms.jsx";
import { useState, useEffect } from "react";
import { flushSync } from "react-dom";
import api from "../../utils/Api.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import InfoToolTip from "../InfoToolTip/InfoToolTip.jsx";
import logo from "../../images/filmera-logo.png";

const queryClient = new QueryClient();

const App = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isAuthChecked, setIsAuthChecked] = useState(false);
    const [isSplashDone, setIsSplashDone] = useState(false);
    const [tooltip, setTooltip] = useState({
        isOpen: false,
        isSuccess: false,
        message: "",
    });

    const handleLogin = async ({ email, password }) => {
        const data = await api.signin({ email, password });

        localStorage.setItem("jwt", data.token);
        const user = await api.getCurrentUser();
        const currentUserData = user.user || user;
        flushSync(() => {
            setCurrentUser(currentUserData);
        });
        return currentUserData;
    };

    const handleForgotPassword = ({ email }) => {
        return api.forgotPassword({ email });
    };

    const handleLogout = () => {
        localStorage.removeItem("jwt");
        setCurrentUser(null);
    };

    useEffect(() => {
        const checkToken = async () => {
            const token = localStorage.getItem("jwt");
            if (!token) {
                setIsAuthChecked(true);
                return;
            }

            try {
                const user = await api.getCurrentUser();
                setCurrentUser(user.user || user);
            } catch {
                localStorage.removeItem("jwt");
                setCurrentUser(null);
            } finally {
                setIsAuthChecked(true);
            }
        };
        checkToken();
    }, []);

    useEffect(() => {
        const splashTimer = window.setTimeout(() => {
            setIsSplashDone(true);
        }, 900);

        return () => window.clearTimeout(splashTimer);
    }, []);

    if (!isAuthChecked || !isSplashDone) {
        return (
            <main className="app-splash" aria-label="Loading FILMERA">
                <div className="app-splash__brand">
                    <img src={logo} alt="" width={72} height={72} className="app-splash__logo" />
                    <div className="app-splash__copy">
                        <p className="app-splash__eyebrow">FILMERA</p>
                        <h1 className="app-splash__title">Movie night, matched</h1>
                    </div>
                </div>
                <div className="app-splash__bar" aria-hidden="true">
                    <span />
                </div>
            </main>
        );
    }

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Index
                                currentUser={currentUser}
                                onLogin={handleLogin}
                                onForgotPassword={handleForgotPassword}
                                onLogout={handleLogout}
                                isAuthChecked={isAuthChecked}
                                setTooltip={setTooltip}
                            />
                        } />
                    <Route path="/room" element={<ProtectedRoute currentUser={currentUser}>
                        <Room
                            currentUser={currentUser}
                            onLogin={handleLogin}
                            onForgotPassword={handleForgotPassword}
                            setTooltip={setTooltip}
                        />
                    </ProtectedRoute>} />
                    <Route path="/room/:code" element={<ProtectedRoute currentUser={currentUser}>
                        <Room
                            currentUser={currentUser}
                            onLogin={handleLogin}
                            onForgotPassword={handleForgotPassword}
                            setTooltip={setTooltip}
                        />
                    </ProtectedRoute>} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/delete-account" element={<DeleteAccount />} />
                    <Route path="/leads" element={<Leads />} />
                    <Route path="/reset-password" element={<ResetPassword setTooltip={setTooltip} />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <InfoToolTip
                    isOpen={tooltip.isOpen}
                    isSuccess={tooltip.isSuccess}
                    message={tooltip.message}
                    onClose={() =>
                        setTooltip({
                            isOpen: false,
                            isSuccess: false,
                            message: "",
                        })
                    }
                />
            </BrowserRouter>
        </QueryClientProvider>
    );
};

export default App;
